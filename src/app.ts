import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import indexRouter from './routes/index';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI!, {
}).then(() => console.log("🚀 ~ MongoDB connected successfully!"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use('/api', indexRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});