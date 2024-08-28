import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';

const { DEV_DATABASE_URI, MAIN_DATABASE_URI, DB_PORT, NODE_ENV } = process.env;

// https://typeorm.io/data-source-options#postgres--cockroachdb-data-source-options
const config: DataSourceOptions = {
  type: 'postgres',
  url: NODE_ENV === 'development' ? DEV_DATABASE_URI : MAIN_DATABASE_URI,
  port: parseInt(DB_PORT!, 10),
  entities: [User, Book],
  migrations: ['src/typeorm/migrations/*.ts'],
  subscribers: [],
  // logging: NODE_ENV === 'development' ? true : false,
  logging: false,
  poolSize: 5,
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

export = config;
