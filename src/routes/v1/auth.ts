import { NextFunction, Request, Response, Router } from 'express';
import SignUp from '../../controllers/auth/SignUp';
import SignIn from '../../controllers/auth/SignIn';

const AuthRouter = Router();

const loginErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res.status(403).json({ message: 'Invalid Login Details' });
  }

  next();
};

// SignUp Route
AuthRouter.post('/signup', SignUp);
AuthRouter.post('/signin', SignIn);

export default AuthRouter;
