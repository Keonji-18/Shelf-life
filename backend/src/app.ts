import express from "express";
import {requestContextMiddleware} from "./middleware/request-context.middleware";
import {requestLoggerMiddleware} from "./middleware/request-logger.middleware";
import {errorHandler} from "./core/errors/ErrorHandler";
import cookieParser from "cookie-parser";
import {userRouter} from "./routes/user.route";
import {householdRouter} from "./routes/household.route";
import {authenticateUser} from "./middleware/auth.middleware";

export const app = express()

app.use(requestContextMiddleware)
app.use(requestLoggerMiddleware)
app.use(express.json())
app.use(cookieParser())

app.use(userRouter)
app.use(authenticateUser, householdRouter)

app.get('/', (req, res) => {

    res.status(200).json({message: 'Hello World'});
})



app.use(errorHandler)