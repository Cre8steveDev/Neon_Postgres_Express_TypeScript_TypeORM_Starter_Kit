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
