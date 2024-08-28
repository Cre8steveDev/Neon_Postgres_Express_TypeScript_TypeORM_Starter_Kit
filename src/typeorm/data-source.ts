import { DataSource } from 'typeorm';
import config from './config/config';
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';

// Initialize the datasource/database connection
export const DB = new DataSource(config);

// Export Repository for the Entities
// https://typeorm.io/working-with-repository
const UserRepo = DB.getRepository(User);
const BookRepo = DB.getRepository(Book);

export { UserRepo, BookRepo };
