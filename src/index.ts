import 'reflect-metadata';
import express from 'express';

// Load Environment Variables with dotenv package
import dotenv from 'dotenv';
dotenv.config();
const { PORT, COOKIE_SECRET } = process.env;

// Import Middleware
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/v1/auth';
import customErrorHandler from './middleware/customErrorHandler';
import ConnectDatabase from './typeorm/connectDB';

// Instantiate the express app
const app = express();

// Register middlewares on the app
app.use(cors());
app.use(cookieParser(COOKIE_SECRET!));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API VERSIONING - Version 1.0
app.use('/api/v1/auth', AuthRouter);

// Custom Error handler placed after all other routes
app.use(customErrorHandler);

// Connect to Database and on success, start the server
ConnectDatabase().then(() => {
  // Start Server
  app.listen(PORT || 3000, () =>
    console.log('Server is running on port: ', PORT)
  );
});
