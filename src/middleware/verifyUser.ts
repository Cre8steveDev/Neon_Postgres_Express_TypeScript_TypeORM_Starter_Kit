import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepo } from '../typeorm/data-source';
import CustomError from '../utils/CustomError';

/**
 * Middleware to verify user authentication using JWT.
 *
 * This middleware performs the following steps:
 * 1. Extracts the JWT from the Authorization header
 * 2. Verifies the JWT using the secret key
 * 3. Finds the user in the database based on the userId in the JWT payload
 * 4. Attaches the user object to the request for use in subsequent middleware or route handlers
 *
 * @throws {CustomError} 401 - If no token is provided or the token is invalid
 * @throws {CustomError} 401 - If the token has expired
 * @throws {CustomError} 404 - If the user associated with the token is not found
 * @throws {CustomError} 500 - For any other unexpected errors
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError(
        401,
        'No token provided in the Authorization Header',
        { success: false }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    const user = await UserRepo.findOne({ where: { id: decoded.userId } });

    if (!user) throw new CustomError(404, 'User not found', { success: false });

    // Add the user to the request object
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new CustomError(
          401,
          'Sorry, token has expired. Sign in again to get a new token.',
          { success: false }
        )
      );
    }
    if (error instanceof jwt.JsonWebTokenError)
      return next(
        new CustomError(
          401,
          'Unauthorized Access. You have provided an invalid token',
          { success: false }
        )
      );

    if (error instanceof CustomError) return next(error);

    return next(
      new CustomError(500, 'Internal server error', { success: false })
    );
  }
};
