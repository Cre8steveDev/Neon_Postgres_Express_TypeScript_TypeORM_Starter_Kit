import { Request } from 'express';
import { TSigninForm } from '../types/types';

/**
 * Validates and sanitizes the sign-in form data.
 * taken from req.body
 * @param {Request} req - The Express request object.
 * @returns  An object with the validation result.
 */
const validateSignInForm = (req: Request) => {
  const { email, password } = req.body as TSigninForm;

  // Use a better input validation like Joi or Zod or sanitize or express-validator
  if (!email) return { error: 'Required field: email', data: null };
  if (!password) return { error: 'Required field: password', data: null };

  return {
    error: null,
    form: { email, password },
  };
};

export default validateSignInForm;
