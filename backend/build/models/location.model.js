"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const citySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
});
const stateSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    cities: [citySchema],
});
const countrySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    states: [stateSchema],
});
exports.Country = mongoose_1.default.model('Country', countrySchema);
