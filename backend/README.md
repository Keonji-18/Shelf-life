# Shelf Life Backend

The Shelf Life backend is an Express and TypeScript API for authenticated household inventory management. It stores data in MongoDB through Prisma and uses an HTTP-only cookie containing a JWT for authentication.

## Features

- User registration, login, logout, and current-user lookup
- Household creation, lookup, member listing, joining, and leaving
- Household inventory item CRUD operations
- Item search, sorting, and expiry status lookup
- Zod request validation
- Centralized application errors and JSON responses
- Request IDs and request logging

## Tech Stack

- Node.js and TypeScript
- Express 5
- Prisma ORM with MongoDB
- Zod
- `jsonwebtoken` and `bcrypt`
- `cookie-parser`
- Winston

## Project Structure

```text
backend/
├── prisma/schema.prisma       # MongoDB schema
├── generated/prisma/          # Generated Prisma client
├── src/
│   ├── app.ts                 # Express app and route registration
│   ├── server.ts              # Server entry point
│   ├── config/                # Environment, database, and logger setup
│   ├── context/               # Per-request context
│   ├── controller/            # HTTP request handlers
│   ├── core/                  # Error and HTTP response primitives
│   ├── dto/                   # Response mapping and DTO types
│   ├── middleware/            # Auth, validation, context, and logging
│   ├── repo/                  # Prisma data-access functions
│   ├── routes/                # Express route definitions
│   ├── services/              # Application and business logic
│   ├── utils/                 # Shared helpers, including JWT utilities
│   ├── validation/            # Zod schemas for request bodies
│   └── types.d.ts             # Express request and domain type extensions
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Request Flow

Requests enter through `src/app.ts`, where request context, logging, JSON parsing, and cookie parsing are installed. Routes dispatch to controllers, controllers call services, and services use repositories for Prisma operations. Errors are passed to the final centralized error handler.

Routes are mounted as follows:

```text
/users                         public and authenticated user operations
/households                    authenticated household operations
/households/:householdId       authenticated inventory operations
```

Successful responses use this shape:

```json
{
  "success": true,
  "data": {}
}
```

## Configuration

Create `backend/.env` before starting the server:

```env
PORT=3001
NODE_ENV=development
DATABASE_URL="mongodb+srv://<username>:<password>@<host>/<database>"
JWT_SECRET="a-secret-with-at-least-32-characters"
```

`PORT` and `NODE_ENV` default to `3001` and `development`. `DATABASE_URL` must be a valid MongoDB URL, and `JWT_SECRET` must be at least 32 characters long. Invalid configuration stops the process during startup.

## Setup and Commands

```bash
cd backend
npm install
npx prisma generate
```

Start the development server with reload-on-change:

```bash
npm run dev
```

Build and start the compiled server:

```bash
npm run build
npm start
```

The API is available at `http://localhost:${PORT}`. The root endpoint, `GET /`, returns a small server health response.

Useful Prisma commands:

```bash
npx prisma validate
npx prisma generate
npx prisma db push
```

The repository does not currently contain migrations or a seed script. `db push` can be used when applying the current schema directly to a development database.

## Authentication

`POST /users/login` signs a JWT and sets it in an HTTP-only `ACCESS_TOKEN` cookie. Protected routes read this cookie through `cookie-parser` and `authenticateUser` middleware.

The login cookie is configured with a seven-day lifetime. Clients must preserve cookies between requests; an `Authorization` bearer header is not used by the current implementation.

## API Reference

All request bodies are JSON. Unless stated otherwise, authenticated endpoints require a valid `ACCESS_TOKEN` cookie.

### Users

#### `POST /users/register`

Creates a user. The name must contain at least 3 characters, the password must be 8-32 characters, and the email must be valid.

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "StrongPass123!"
}
```

#### `POST /users/login`

Authenticates a user and sets the `ACCESS_TOKEN` cookie.

```json
{
  "email": "jane@example.com",
  "password": "StrongPass123!"
}
```

#### `POST /users/logout`

Clears the authentication cookie.

#### `GET /users/me`

Returns the authenticated user without the stored password hash.

### Households

#### `POST /households`

Creates a household for the authenticated user. The name must contain at least 5 characters.

```json
{
  "name": "Kitchen Inventory"
}
```

#### `GET /households/:householdId`

Returns the household and its stored item ID references.

#### `GET /households/:householdId/details`

Returns the household with its members and inventory.

#### `GET /households/:householdId/members`

Returns the household members.

#### `POST /households/join?inviteCode=<invite-code>`

Joins the household identified by the `inviteCode` query parameter. This endpoint does not expect a request body.

#### `DELETE /households/:householdId/members`

Removes the authenticated user from the household.

### Inventory Items

Inventory routes are mounted below `/households/:householdId`.

#### `GET /households/:householdId/items`

Returns the household's items. Optional query parameters:

- `search`: case-insensitive name search
- `sortBy`: `name` or `expiry`
- `sortOrder`: `asc` or `desc`

Items default to newest first by `createdAt`.

#### `POST /households/:householdId/items`

Adds an item. `barcode` must be exactly 12 characters and `expiry` must be a valid date.

```json
{
  "name": "Milk",
  "barcode": "123456789012",
  "expiry": "2026-10-15T00:00:00.000Z"
}
```

#### `PATCH /households/:householdId/:itemId`

Updates any supplied item fields: `name`, `barcode`, or `expiry`.

#### `GET /households/:householdId/:itemId/status`

Returns the item with an expiry status of `fresh`, `Expires Soon`, or `Expired`.

#### `DELETE /households/:householdId/:itemId`

Deletes the item from the household inventory.

## Data Model

The Prisma schema in `prisma/schema.prisma` defines three MongoDB collections:

- `user`: email, display name, password hash, optional household relation, and timestamps
- `household`: name, unique invite code, member relation, item ID references, and timestamps
- `item`: name, unique 12-character barcode, expiry date, household ID references, and timestamps

MongoDB ObjectIds are represented as strings in the TypeScript API. Password hashes are never included in response DTOs.

## Error Handling and Validation

Request validators use Zod schemas from `src/validation`. Validation middleware rejects invalid input before the controller runs. Application errors are represented by `AppError` and formatted by `src/core/errors/ErrorHandler`; responses include the appropriate HTTP status and structured error information.

## Current Boundaries

- Authentication is cookie-based JWT authentication.
- The current data model supports one household per user through `user.householdId`.
- Household and item access checks are implemented in the service/repository layer; role-based household permissions are not modeled.
- There are currently no automated tests, migrations, seed command, or OpenAPI specification in this backend package.
