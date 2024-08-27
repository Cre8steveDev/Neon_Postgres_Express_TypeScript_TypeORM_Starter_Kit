import CustomError from '../utils/CustomError';
import { NextFunction, Request, Response } from 'express';

/**
 * Error Handler Middleware
 *
 * Catches and handles errors thrown by the application, sending a JSON response with the error details.
 *
 * @param {CustomError} err - The error object thrown by the application.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express chain.
 */

const customErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...err.data,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

export default customErrorHandler;
