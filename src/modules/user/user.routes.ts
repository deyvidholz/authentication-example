import { Router } from 'express';
import { UserController } from './user.controller';

const userRouter = Router();
const controller = new UserController();

userRouter.post('/auth', controller.auth);
userRouter.post('/', controller.create);

export default userRouter;
