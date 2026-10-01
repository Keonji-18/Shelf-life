import {Router} from 'express';
import {itemController} from "../controller/item.controller";
import {addItemValidator, updateItemValidator} from "../middleware/validator.middleware";


export const itemRouter = Router();

itemRouter.get('/:householdId/items', itemController.getAllItems);
itemRouter.post('/:householdId/items', addItemValidator, itemController.addItem)
itemRouter.patch('/:householdId/:itemId', updateItemValidator, itemController.updateItem)
itemRouter.get('/:householdId/:itemId/status', itemController.getItemStatus)
itemRouter.delete('/:householdId/:itemId', itemController.deleteItem);