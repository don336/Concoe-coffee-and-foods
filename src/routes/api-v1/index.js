import { Router } from 'express';
import userRoute from './user';
import cropRouter from './crop';
import salesRoute from './sales';

const route = Router();

route.use('/auth/', userRoute);
route.use('/crop/', cropRouter);
route.use('/sales/', salesRoute);

export default route;
