import {Router} from 'express';
import {userLoginValidator, userRegisterValidator,} from "../middleware/validator.middleware";
import {userController} from "../controller/user.controller";
import {authenticateUser} from "../middleware/auth.middleware";

export const userRouter = Router();

userRouter.post('/register', userRegisterValidator, userController.register)
userRouter.post('/login', userLoginValidator, userController.login)
userRouter.post('/logout',authenticateUser, userController.logout)
userRouter.get('/me',authenticateUser, userController.getMe)