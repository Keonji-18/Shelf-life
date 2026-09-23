import {Request,Response} from "express";
import {UserResponseDto} from "../dto/user.dto";
import {userService} from "../services/user.service";
import {LoginUser, RegisterUser} from "../validation/user.validation";
import {HTTP_STATUS} from "../core/http/httpStatus";



export async function registerUser(
    req: Request,
    res: Response) {


    const input = req.body as RegisterUser
    const result = await userService.register(input);

    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: result
    });
}

export async function loginUser(
    req: Request,
    res: Response
){
    const input = req.body as LoginUser
    const result = await userService.login(input);

    res.cookie("ACCESS_TOKEN",result.token,{httpOnly: true, maxAge: 7 * 24 * 60 * 60});

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message:"Logged in successfully",
        data: result.user,

    })
}

export async function getMe(
    req: Request,
    res: Response
){
    const id = req.userId
    const result = await userService.getMe(id);

    res.status(HTTP_STATUS.OK).json({
        success: true,

        data: result

    })
}