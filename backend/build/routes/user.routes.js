"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const userRouter = express_1.default.Router();
userRouter.post('/register', user_controller_1.saveUser);
userRouter.post('/login', auth_controller_1.loginUser);
// userRouter.get('/users', auth, listUsers);
userRouter.get('/users', user_controller_1.listUsers);
userRouter.get('/countries', user_controller_1.getAllCountriesWithStatesAndCities);
userRouter.post('/countries', user_controller_1.saveStatesAndCitiesForCountry);
exports.default = userRouter;
