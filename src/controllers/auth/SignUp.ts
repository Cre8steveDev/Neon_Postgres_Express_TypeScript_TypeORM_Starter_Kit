import bcryptjs from 'bcryptjs';
import { UserRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';
import validateSignUpForm from '../../utils/validateSignUp';
import type { NextFunction, Request, Response } from 'express';

/**
 * UserSignUp - Controller for creating a New User Account
 * @param req - Request Object from the Client
 * @param res - Response Object to reply to Client
 * @returns void
 */

const UserSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const data = validateSignUpForm(req);

  // If An error occurs in validation
  if (data.error || !data.form) {
    const error = new CustomError(400, data.error, { success: false });
    return next(error);
  }

  try {
    const { form } = data;
    form.password = bcryptjs.hashSync(form.password, bcryptjs.genSaltSync(10));
    form.dateOfBirth = new Date(form.dateOfBirth);

    const existingUser = await UserRepo.findOne({
      where: { email: form.email },
    });

    if (existingUser) {
      const error = new CustomError(400, 'User already exists.', {
        success: false,
      });
      return next(error);
    }

    // Create new user
    const newUser = UserRepo.create(form);
    const user = await UserRepo.save(newUser);

    return res
      .status(201)
      .json({ success: true, message: 'User Account created successfully.' });
  } catch (error: any) {
    return res.status(403).json({ success: false, message: error.message });
  }
};

export default UserSignUp;
