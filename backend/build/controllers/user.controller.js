"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveStatesAndCitiesForCountry = exports.getAllCountriesWithStatesAndCities = exports.listUsers = exports.saveUser = void 0;
const user_model_1 = require("../models/user.model");
const location_model_1 = require("../models/location.model");
function saveUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.body;
            const newUser = new user_model_1.User(userData);
            const savedUser = yield newUser.save();
            res.status(200).json(savedUser);
        }
        catch (error) {
            res.status(500).json({ message: 'Error saving user', error });
        }
    });
}
exports.saveUser = saveUser;
function listUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.User.find();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: 'Error listing users', error });
        }
    });
}
exports.listUsers = listUsers;
const getAllCountriesWithStatesAndCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield location_model_1.Country.find({}, { name: 1, states: 1 });
        res.status(200).json(countries);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});
exports.getAllCountriesWithStatesAndCities = getAllCountriesWithStatesAndCities;
const saveStatesAndCitiesForCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, states } = req.body;
    try {
        const country = new location_model_1.Country({ name, states });
        const savedCountry = yield country.save();
        res.json(savedCountry);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});
exports.saveStatesAndCitiesForCountry = saveStatesAndCitiesForCountry;
