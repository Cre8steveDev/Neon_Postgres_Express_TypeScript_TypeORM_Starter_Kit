import { NextFunction, Request, Response, Router } from 'express';

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

// Confirm Login Status
AuthRouter.get('/status', (request, response) => {
  return request.user
    ? response.json({ authenticated: true })
    : response.json({ authenticated: false });
});

export default AuthRouter;

