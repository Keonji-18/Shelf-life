import {Router} from 'express';
import {userLoginValidator, userRegisterValidator,} from "../middleware/validator.middleware";
import {getMe, loginUser, registerUser} from "../controller/user.controller";
import {authenticateUser} from "../middleware/auth.middleware";

export const userRouter = Router();

userRouter.post('/users/register', userRegisterValidator, registerUser)
userRouter.post('/users/login', userLoginValidator, loginUser)

userRouter.get('/users/me',authenticateUser, getMe)