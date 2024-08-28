import { NextFunction, Request, Response, Router } from 'express';
import SignUp from '../../controllers/auth/SignUp';
import SignIn from '../../controllers/auth/SignIn';

const AuthRouter = Router();

// Add Route and Controllers Related to Auth
// Feel Free to Include other operations like
// refresh token, generate/Verify OTP, e.t.c
AuthRouter.post('/signup', SignUp);
AuthRouter.post('/signin', SignIn);

export default AuthRouter;
