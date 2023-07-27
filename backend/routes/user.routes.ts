import express from 'express';
import { saveUser, listUsers } from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';
import { auth } from '../middlewares/auth';

const userRouter = express.Router();

userRouter.post('/register', saveUser);

userRouter.post('/login', loginUser);

userRouter.get('/users', auth, listUsers);

export default userRouter;
