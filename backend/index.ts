import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors({origin: "*"}));
app.use(bodyParser.json());

const uri: string = process.env.MONGODB_URI || '';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.log(err))

app.use("/api/v1", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
