import { Request } from 'express';
import { TCreateBook } from '../types/types';

/**
 * Validates and sanitizes the Create Book form data.
 * taken from req.body
 * @param {Request} req - The Express request object.
 * @returns  An object with the validation result.
 */
const validateCreateBookForm = (req: Request) => {
  const { title, author, pageNumber } = req.body as TCreateBook;

  // Use a better input validation like Joi or Zod or sanitize or express-validator
  // And To Sanitize user input against SQL Injection
  if (!title)
    return { error: 'Request Missing Required field: title', data: null };
  if (!author)
    return { error: 'Request Missing Required field: author', data: null };
  if (!pageNumber)
    return { error: 'Request Missing Required field: pageNumber', data: null };

  return {
    error: null,
    form: { title, author, pageNumber },
  };
};

export default validateCreateBookForm;
