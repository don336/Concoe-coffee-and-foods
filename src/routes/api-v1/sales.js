import { Router } from 'express';
import SalesController from '../../controllers/sales';
import { checkAuth } from '../../middleware/checkAuth';

const salesRoute = Router();
salesRoute.get('/', SalesController.getSales);
salesRoute.get('/:id', checkAuth, SalesController.getSales);
salesRoute.post('/', checkAuth, SalesController.postSale);
salesRoute.put('/:id', checkAuth, SalesController.updateSale);
salesRoute.delete('/:id', checkAuth, SalesController.deleteSale);

export default salesRoute;
