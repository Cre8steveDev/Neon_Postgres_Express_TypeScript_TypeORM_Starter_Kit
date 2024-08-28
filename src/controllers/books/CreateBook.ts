import CustomError from '../../utils/CustomError';
import { BookRepo } from '../../typeorm/data-source';
import { Request, Response, NextFunction } from 'express';
import validateCreateBookForm from '../../utils/validateCreateBookForm';

/**
 * CreateBook - Controller for handling Book Creation
 * @param req - Request Object from Express
 * @param res - Response Object from Express
 * @param next - Next Function in case of Error to pass to errorhandler
 * @returns appropriate error message or the book
 */
const CreateBook = async (req: Request, res: Response, next: NextFunction) => {
  const data = validateCreateBookForm(req);

  if (data.error || !data.form) {
    const error = new CustomError(400, data.error, {
      success: false,
      book: null,
    });
    return next(error);
  }

  try {
    const { form } = data;
    const user = req.user;

    if (!user) {
      const error = new CustomError(401, 'User not authenticated', {
        success: false,
        book: null,
      });
      return next(error);
    }

    const newBook = BookRepo.create({ ...form, user });
    const savedBook = await BookRepo.save(newBook);

    return res.status(201).json({
      success: true,
      message: 'Book created successfully',
      book: {
        id: savedBook.id,
        title: savedBook.title,
        author: savedBook.author,
        createdAt: savedBook.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Create Book error:', error);
    return res
      .status(500)
      .json({ success: false, message: error.message, book: null });
  }
};

export default CreateBook;
