import {toUserLoginDto, toUserResponseDto} from "../dto/user.dto";
import bcrypt from "bcrypt";
import {userRepo} from "../repo/user.repo";
import {AppError} from "../core/errors/AppError";
import {HTTP_STATUS} from "../core/http/httpStatus";
import {ERROR_CODES} from "../core/errors/errorCodes";
import {LoginUser, RegisterUser} from "../validation/user.validation";
import {generateAccessToken} from "../utils/auth.util";



const SALT_ROUNDS = 12
const register = async (
    userDetails: RegisterUser
) => {

    const email = userDetails.email.trim();
    const name = userDetails.name.trim();
    const existingUser = await userRepo.getUserByEmail(email)

    if(existingUser){
        throw new AppError("Email already exists!",
            HTTP_STATUS.CONFLICT,
            ERROR_CODES.USER_ALREADY_EXISTS)
    }

    const password = userDetails.password.trim();
    const hashPassword:string = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userRepo.createUser({
        name,
        email,
        hashPassword,
    })

    return toUserResponseDto(
        user
    )

}

const login = async (loginDetails:LoginUser) =>{

    const email = loginDetails.email.trim();
    const password = loginDetails.password.trim();

    const user = await userRepo.getUserByEmail(email)

    if(!user){
        throw new AppError("Invalid Email or Password",
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.INVALID_CREDENTIALS)
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashPassword)

    if(!isPasswordValid){
        throw new AppError("Invalid Email or Password",
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.INVALID_CREDENTIALS)
    }

    const token = generateAccessToken({email,id: user.id})

    return toUserLoginDto(user, token);

}

const  getMe = async (userId:string) =>{

    const user = await userRepo.getUserById(userId);

    if(!user){
        throw new AppError("User not found!",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.USER_NOT_FOUND)
    }

    return toUserResponseDto(
        user
    );
}

export  const userService= {
    register,
    login,
    getMe,
}