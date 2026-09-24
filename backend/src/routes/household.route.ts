import {Router} from 'express';
import {addItemValidator, createHouseholdValidator, updateItemValidator} from "../middleware/validator.middleware";
import {householdController} from "../controller/household.controller";

export const householdRouter = Router();

householdRouter.post("/", createHouseholdValidator, householdController.create);
householdRouter.get('/:householdId', householdController.getById);
householdRouter.get('/:householdId/details', householdController.getDetails);
householdRouter.get('/:householdId/members', householdController.getMembers);
householdRouter.post('/join', householdController.addMember)
householdRouter.delete('/:householdId/members', householdController.deleteMember);
householdRouter.patch('/:householdId/:itemId', updateItemValidator, householdController.updateItem)
householdRouter.post('/:householdId', addItemValidator, householdController.addItem)
householdRouter.get('/:householdId/:itemId/status', householdController.getItemStatus)
householdRouter.delete('/:householdId/:itemId', householdController.deleteItem);