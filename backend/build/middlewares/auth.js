"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function auth(req, res, next) {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token', error });
    }
}
exports.auth = auth;
