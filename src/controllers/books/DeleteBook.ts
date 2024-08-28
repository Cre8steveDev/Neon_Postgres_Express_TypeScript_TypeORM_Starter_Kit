import { Request, Response, NextFunction } from 'express';
import CustomError from '../../utils/CustomError';
import { BookRepo } from '../../typeorm/data-source';

type DeleteBookBody = { bookId: string };

/**
 * Controller to handle Delete Request for a book
 * Requires the bookId included in the body of the request.
 * middleware verifies auth status of user from the header.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns Deletion success message or appropriate error
 */
const DeleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.body as DeleteBookBody;
    const user = req.user;

    if (!bookId) {
      return next(
        new CustomError(
          400,
          'BAD REQUEST: bookId is required for deletion. Provide a field `bookId` in the request body.',
          { success: false }
        )
      );
    }

    const book = await BookRepo.findOne({
      where: { id: bookId },
      relations: { user: true },
      select: { user: { id: true, fullName: true } },
    });

    if (!book) {
      const error = new CustomError(
        404,
        'Sorry, the requested book was not found.',
        { success: false }
      );
      return next(error);
    }

    if (book.user.id !== user?.id) {
      return next(
        new CustomError(
          403,
          'Unauthorized Action. You are not authorized to delete this book. Only the User who posted the book can modify the field',
          { success: false }
        )
      );
    }

    const updatedBook = await BookRepo.remove(book);

    res
      .status(201)
      .json({ success: true, message: 'Book deleted successfully.' });
  } catch (error) {
    next(
      new CustomError(
        500,
        'Ooops! An error occured while attempting to delete the book. Try again later.',
        { success: false }
      )
    );
  }
};

export default DeleteBook;
