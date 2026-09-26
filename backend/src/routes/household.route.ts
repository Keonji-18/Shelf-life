import {Router} from 'express';
import {createHouseholdValidator} from "../middleware/validator.middleware";
import {householdController} from "../controller/household.controller";

export const householdRouter = Router();

householdRouter.post("/", createHouseholdValidator, householdController.create);
householdRouter.get('/:householdId', householdController.getById);
householdRouter.get('/:householdId/details', householdController.getDetails);
householdRouter.get('/:householdId/members', householdController.getMembers);
householdRouter.post('/join', householdController.addMember)
householdRouter.delete('/:householdId/members', householdController.deleteMember);