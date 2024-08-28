import { Request, Response, NextFunction } from 'express';
import CustomError from '../../utils/CustomError';
import { BookRepo } from '../../typeorm/data-source';

interface UpdateBookBody {
  title?: string;
  pageNumber?: number;
  author?: string;
  bookId: string;
}
/**
 * Controller to handle Update Request for a Book Entity.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns Updated Book Object with the selected fields
 */
const UpdateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, pageNumber, author, bookId } = req.body as UpdateBookBody;
    const user = req.user;

    /** Take note of this weird behaviour by typeORM. So always explictily
     * check for your query fields. When bookId is undefined, TypeORM's
     * findOne method behaves differently than you might expect.
     * Instead of returning null, it might return the first book in the database.
     * And this DEFINITELY IS NOT WHAT YOU WANT.
     */
    if (!bookId) {
      return next(
        new CustomError(
          400,
          'BAD REQUEST: bookId is required - send in the request body. Updatable fields: title, pageNumber, author',
          {
            success: false,
            book: null,
          }
        )
      );
    }
    // Check if at least one valid field is provided for update
    if (!title && !pageNumber && !author) {
      const error = new CustomError(
        400,
        'No valid update fields provided. Updatable fields: title, pageNumber, author',
        {
          success: false,
          book: null,
        }
      );
      return next(error);
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
        { success: false, book: null }
      );
      return next(error);
    }

    if (book.user.id !== user?.id) {
      return next(
        new CustomError(
          403,
          'Unauthorized Action. You are not authorized to update this book. Only the User who posted the book can modify the field',
          { success: false, book: null }
        )
      );
    }

    // Update only the provided fields
    if (title) book.title = title;
    if (pageNumber) book.pageNumber = pageNumber;
    if (author) book.author = author;

    const updatedBook = await BookRepo.save(book);

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      book: {
        id: updatedBook.id,
        title: updatedBook.title,
        pageNumber: updatedBook.pageNumber,
        author: updatedBook.author,
        user: {
          fullName: updatedBook.user.fullName,
        },
      },
    });
  } catch (error) {
    next(
      new CustomError(
        500,
        'Ooops! An error occured while updating the book. Try again later.',
        { success: false, book: null }
      )
    );
  }
};

export default UpdateBook;
