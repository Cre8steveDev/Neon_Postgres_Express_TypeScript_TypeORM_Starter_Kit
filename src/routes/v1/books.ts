import { Router } from 'express';

import { verifyUser } from '../../middleware/verifyUser';
import CreateBook from '../../controllers/books/CreateBook';
import GetBook from '../../controllers/books/GetBook';
import GetAllBooks from '../../controllers/books/GetAllBooks';

const BooksRouter = Router();

// Add Route and Controllers Related CRUD Ops
BooksRouter.post('/create', verifyUser, CreateBook);
BooksRouter.get('/get/:id', GetBook);
BooksRouter.get('/all', GetAllBooks);

export default BooksRouter;
