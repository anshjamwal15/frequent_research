import express from 'express';
import { saveUser, listUsers, getAllCountriesWithStatesAndCities, saveStatesAndCitiesForCountry } from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';
import { auth } from '../middlewares/auth';

const userRouter = express.Router();

userRouter.post('/register', saveUser);

userRouter.post('/login', loginUser);

// userRouter.get('/users', auth, listUsers);
userRouter.get('/users', listUsers);

userRouter.get('/countries', getAllCountriesWithStatesAndCities);

userRouter.post('/countries', saveStatesAndCitiesForCountry);


export default userRouter;
