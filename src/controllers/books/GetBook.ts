import { Request, Response, NextFunction } from 'express';
import { BookRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';

/**
 * Controller to handle GET requests for retrieving a single book by ID.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns Promise<void>
 */
const GetBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    const error = new CustomError(
      404,
      'Book ID is required as a url parameter. /api/books/get/<BOOK_ID_HERE>',
      { success: false, book: null }
    );
    return next(error);
  }

  // Learn more about find options:
  // https://typeorm.io/find-options
  try {
    const book = await BookRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!book) {
      const error = new CustomError(404, 'Book not found', {
        success: false,
        book: null,
      });
      return next(error);
    }

    return res.status(200).json({
      success: true,
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
        createdAt: book.createdAt,
        user: {
          fullName: book.user.fullName,
        },
      },
    });
  } catch (error: any) {
    console.error('Get Book error:', error);
    return res
      .status(500)
      .json({ success: false, message: error.message, book: null });
  }
};

export default GetBook;
