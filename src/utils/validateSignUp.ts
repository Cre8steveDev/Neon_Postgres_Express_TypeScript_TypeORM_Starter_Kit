import { Request } from 'express';
import { TSignupForm } from '../types/types';

/**
 * Validates and sanitizes the sign-up form data.
 * taken from req.body
 * @param {Request} req - The Express request object.
 * @returns  An object with the validation result.
 */
const validateSignUpForm = (req: Request) => {
  const { fullName, email, dateOfBirth, phoneNumber, password } =
    req.body as TSignupForm;

  // Use a better input validation like Joi or Zod or sanitize or express-validator
  // And To Sanitize user input against SQL Injection
  if (!fullName) return { error: 'Required field: fullName', data: null };
  if (!email) return { error: 'Required field: email', data: null };
  if (!dateOfBirth) return { error: 'Required field: dateOfBirth', data: null };
  if (!phoneNumber) return { error: 'Required field: phoneNumber', data: null };
  if (!password) return { error: 'Required field: password', data: null };

  return {
    error: null,
    form: { fullName, email, dateOfBirth, phoneNumber, password },
  };
};
export default validateSignUpForm;
