import { Router } from 'express';

import GetBook from '../../controllers/books/GetBook';
import { verifyUser } from '../../middleware/verifyUser';
import CreateBook from '../../controllers/books/CreateBook';
import UpdateBook from '../../controllers/books/UpdateBook';
import GetAllBooks from '../../controllers/books/GetAllBooks';
import DeleteBook from '../../controllers/books/DeleteBook';

const BooksRouter = Router();

// Add Route and Controllers Related CRUD Ops
BooksRouter.post('/create', verifyUser, CreateBook);
BooksRouter.put('/update', verifyUser, UpdateBook);
BooksRouter.delete('/delete', verifyUser, DeleteBook);

BooksRouter.get('/get/:id', GetBook);
BooksRouter.get('/all', GetAllBooks);

export default BooksRouter;
