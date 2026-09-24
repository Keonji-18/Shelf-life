import {Router} from 'express';
import {addItemValidator, createHouseholdValidator, updateItemValidator} from "../middleware/validator.middleware";
import {householdController} from "../controller/household.controller";

export const householdRouter = Router();

householdRouter.post("/households", createHouseholdValidator, householdController.create);
householdRouter.get('/households/:householdId', householdController.getById);
householdRouter.get('/households/:householdId/details', householdController.getDetails);
householdRouter.get('/households/:householdId/members', householdController.getMembers);
householdRouter.post('/households/join', householdController.addMember)
householdRouter.delete('/households/:householdId/members', householdController.deleteMember);
householdRouter.patch('/households/:householdId/:itemId', updateItemValidator, householdController.updateItem)
householdRouter.post('/households/:householdId', addItemValidator, householdController.addItem)
householdRouter.get('/households/:householdId/:itemId/status', householdController.getItemStatus)
householdRouter.delete('/households/:householdId/:itemId', householdController.deleteItem);