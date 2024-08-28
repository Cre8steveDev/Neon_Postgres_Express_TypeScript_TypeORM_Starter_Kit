import { Router } from 'express';

import { verifyUser } from '../../middleware/verifyUser';
import CreateBook from '../../controllers/books/CreateBook';
import GetBook from '../../controllers/books/GetBook';
import GetAllBooks from '../../controllers/books/GetAllBooks';

const UserRouter = Router();

// Add Route and Controllers Related CRUD Ops
UserRouter.post('/create', verifyUser, CreateBook);
UserRouter.get('/get/:id', GetBook);
UserRouter.get('/all', GetAllBooks);

export default UserRouter;
