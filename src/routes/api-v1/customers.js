import { Router } from 'express';
import customerController from '../../controllers/customers';
import { checkAuth } from '../../middleware/checkAuth';

const customerRoute = Router();
customerRoute.get('/', checkAuth, customerController.getCustomers);
customerRoute.get('/:id', checkAuth, customerController.getCustomer);
customerRoute.post('/', checkAuth, customerController.postCustomer);
customerRoute.put('/:id', checkAuth, customerController.updateCustomer);
customerRoute.delete('/:id', checkAuth, customerController.deleteCustomer);

export default customerRoute;
