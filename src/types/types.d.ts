export type TSignupForm = {
  fullName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  password: string;
};

export type TSigninForm = {
  email: string;
  password: string;
};

export type TBook = {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  user: TUser;
};

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  books: TBook[];
};

export type TCreateBook = {
  title: string;
  author: string;
  pageNumber: number;
};

// Extend the Express Request type to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: TUser;
    }
  }
}
