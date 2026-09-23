import {Router} from 'express';
import {createHouseholdValidator} from "../middleware/validator.middleware";
import {householdController} from "../controller/household.controller";

export const householdRouter = Router();

householdRouter.post("/households", createHouseholdValidator, householdController.create);
householdRouter.get('/households/:householdId',householdController.getById);
householdRouter.get('/households/:householdId/members',householdController.getMembers);
householdRouter.post('/households/join', householdController.addMember)
householdRouter.delete('/households/:householdId/members', householdController.deleteMember);