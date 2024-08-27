import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { DB } from './orm/data-source';
import { User } from './orm/entities/user.entity';

// Load Environment Variables with dotenv package
import dotenv from 'dotenv';
dotenv.config();
const { PORT, COOKIE_SECRET } = process.env;

// Import Middleware
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/v1/auth';

// Instantiate the express app
const app = express();

// Register middlewares on the app
app.use(cors());
app.use(cookieParser(COOKIE_SECRET!));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API VERSIONING
app.use('/api/v1/auth', AuthRouter);

// establish database connection
// DB.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//     // Start Server
//     app.listen(PORT || 3000, () =>
//       console.log('Server is running on port: ', PORT)
//     );
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization:', err);
//     process.exit(1);
//   });
