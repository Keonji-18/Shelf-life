import {NextFunction, Request, Response} from "express";
import {LoginUser, loginUserSchema, RegisterUser, registerUserSchema} from "../validation/user.validation";
import {CreateHousehold, createHouseholdSchema} from "../validation/household.validation";


export function userRegisterValidator(
    req:Request,
    res:Response,
    next:NextFunction)
{
   try {
       const body = req.body as RegisterUser;
       const result = registerUserSchema.parse( body);

       next()


   } catch (error) {
        // Validation Error
       next(error);
   }


}

export function userLoginValidator(
    req:Request,
    res:Response,
    next:NextFunction)
{
    try {
        const body = req.body as LoginUser;
        const result = loginUserSchema.parse(body);

        next()

    } catch (error) {
        next(error);
    }
}

export function createHouseholdValidator(
    req:Request,
    res:Response,
    next:NextFunction
){

    try{
        const input = req.body as CreateHousehold
        const result = createHouseholdSchema.parse(input);

        next()
    }
    catch(error){
        next(error);
    }

}