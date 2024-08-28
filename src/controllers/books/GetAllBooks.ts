import { Request, Response, NextFunction } from 'express';
import { BookRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';

/**
 * Retrieves all books with their respective users.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns Promise<void>
 */
const GetAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BookRepo.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          fullName: true,
        },
      },
    });

    // for multiple relations, add each field in the relations as true,
    // then select specific fields under the select

    if (!books) {
      const error = new CustomError(
        404,
        'Sorry, there are currently no Books saved in the Database',
        { success: false, books: null }
      );
      return next(error);
    }

    return res.status(200).json({
      success: true,
      message: 'All books retrieved successfully.',
      books,
    });
  } catch (error: any) {
    console.error('Get Books error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default GetAllBooks;
