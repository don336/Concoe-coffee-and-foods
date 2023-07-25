import { Router } from 'express';
import { checkAuth } from '../../middleware/checkAuth';
import UserController from '../../controllers/user';

const userRoute = Router();
userRoute.post('/signup', UserController.registeration);
userRoute.post('/signin', UserController.signIn);
userRoute.get('/user/:id', checkAuth, UserController.getAccountInfo);
userRoute.put('/user/:id', checkAuth, UserController.updateAccountInfo);
userRoute.delete('/user/:id', checkAuth, UserController.deleteAccount);
export default userRoute;
