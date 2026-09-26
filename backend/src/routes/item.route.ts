import {Router} from 'express';
import {itemController} from "../controller/item.controller";
import {addItemValidator, updateItemValidator} from "../middleware/validator.middleware";


export const itemRouter = Router();

itemRouter.get('/items', itemController.getAllItems);
itemRouter.post('/items', addItemValidator, itemController.addItem)
itemRouter.patch('/:itemId', updateItemValidator, itemController.updateItem)
itemRouter.get('/:itemId/status', itemController.getItemStatus)
itemRouter.delete('/:itemId', itemController.deleteItem);