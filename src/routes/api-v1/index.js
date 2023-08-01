import { Router } from 'express';
import userRoute from './user';
import cropRouter from './crop';
import salesRoute from './sales';
import customerRoute from './customers';

const route = Router();

route.use('/auth/', userRoute);
route.use('/crop/', cropRouter);
route.use('/sales/', salesRoute);
route.use('/customers/', customerRoute);

export default route;
