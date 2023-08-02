import { Router } from 'express';
import SalesController from '../../controllers/sales';
import { checkAuth } from '../../middleware/checkAuth';

const salesRoute = Router();
salesRoute.get('/', SalesController.getSales);
salesRoute.get('/:customerId/:id', checkAuth, SalesController.getSales);
salesRoute.post('/:customerId/', checkAuth, SalesController.postSale);
salesRoute.put('/:customerId/:id', checkAuth, SalesController.updateSale);
salesRoute.delete('/:customerId/:id', checkAuth, SalesController.deleteSale);

export default salesRoute;
