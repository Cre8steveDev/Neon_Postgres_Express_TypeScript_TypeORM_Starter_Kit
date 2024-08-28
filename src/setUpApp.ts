import 'reflect-metadata';
import express from 'express';

// Load Environment Variables with dotenv package
import dotenv from 'dotenv';
dotenv.config();
const { COOKIE_SECRET } = process.env;

// Import Middleware
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/v1/user';
import AuthRouter from './routes/v1/auth';
import BooksRouter from './routes/v1/books';
import ConnectDatabase from './typeorm/connectDB';
import customErrorHandler from './middleware/customErrorHandler';

// Instantiate the express app
const setUpApp = async () => {
  const app = express();

  // Register middlewares on the app
  app.use(cors({ origin: '*' }));
  app.use(cookieParser(COOKIE_SECRET!));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API VERSIONING - Version 1.0
  app.use('/api/v1/auth', AuthRouter);
  app.use('/api/v1/books', BooksRouter);
  app.use('/api/v1/user', UserRouter);

  // Root Health Check
  app.get('/', (req, res) => {
    res
      .status(200)
      .json({ success: true, message: 'Yaaaay! You have hit the API root.' });
  });

  // Custom Error handler placed after all other routes
  app.use(customErrorHandler);

  // Connect to Database and on success, return the app instance
  await ConnectDatabase();

  // Start Server
  return app;
};

export default setUpApp;
