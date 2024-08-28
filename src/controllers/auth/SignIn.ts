import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import CustomError from '../../utils/CustomError';
import { UserRepo } from '../../typeorm/data-source';
import validateSignInForm from '../../utils/validateSignIn';
import type { NextFunction, Request, Response } from 'express';

/**
 * UserSignIn - Controller for Signing In a User
 * @param req - Request Object from the Client
 * @param res - Response Object to reply to Client
 * @returns an object of appropriate response
 */
const UserSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const data = validateSignInForm(req);

  // If an error occurs in validation
  if (data.error || !data.form) {
    const error = new CustomError(400, data.error, {
      success: false,
      token: null,
      user: null,
    });
    return next(error);
  }

  try {
    const { email, password } = data.form;
    console.log('LOGIN: ', data.form);

    // Find the user by email
    const user = await UserRepo.findOne({
      where: { email },
      select: ['email', 'fullName', 'password'],
    });

    if (!user) {
      const error = new CustomError(401, 'Invalid email or password', {
        success: false,
        token: null,
        user: null,
      });
      return next(error);
    }

    // Verify the password
    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      const error = new CustomError(401, 'Invalid email or password', {
        success: false,
        token: null,
        user: null,
      });
      return next(error);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    return res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      token,
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      token: null,
      user: null,
    });
  }
};

export default UserSignIn;
