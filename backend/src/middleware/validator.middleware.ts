import {NextFunction, Request, Response} from "express";
import {LoginUser, loginUserSchema, RegisterUser, registerUserSchema} from "../validation/user.validation";
import {CreateHousehold, createHouseholdSchema} from "../validation/household.validation";
import {addItemInputSchema, ItemInput, updateItemInputSchema} from "../validation/item.vaidation";


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

export function addItemValidator(
    req:Request,
    res:Response,
    next:NextFunction
){

    try {
        const input = req.body as ItemInput
        const result = addItemInputSchema.parse(input);
        next()
    }catch(error){
        next(error);
    }
}

export function updateItemValidator(
    req: Request,
    res: Response,
    next: NextFunction
){

    try {
        const input = req.body as ItemInput
        const result = updateItemInputSchema.parse(input);
        next()
    }catch(error){
        next(error);
    }
}