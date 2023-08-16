import { Router } from 'express';
import StockController from '../../controllers/stock';
import { checkAuth } from '../../middleware/checkAuth';

const stockRoute = Router();
stockRoute.get('/', StockController.getAllStock);
stockRoute.get('/:id', checkAuth, StockController.getStock);
stockRoute.post('/', checkAuth, StockController.postStock);
stockRoute.put('/:id', checkAuth, StockController.updateStock);
stockRoute.delete('/:id', checkAuth, StockController.deletestock);

export default stockRoute;
