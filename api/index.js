import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
const app = express();
app.use(express.json());
dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
const port = 3000;
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);