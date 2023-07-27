"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const uri = process.env.MONGODB_URI || '';
mongoose_1.default.connect(uri)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => console.log(err));
mongoose_1.default.set('debug', true);
// const connection = mongoose.connection;
// connection.on('error', (error) => {
//   console.error('MongoDB connection error:', error);
// });
// connection.once('open', () => {
//   console.log('MongoDB connection established successfully');
// });
app.use(user_routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});