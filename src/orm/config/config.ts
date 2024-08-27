import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';

const { DEV_DATABASE_URI, MAIN_DATABASE_URI, DB_PORT, NODE_ENV } = process.env;

const config: DataSourceOptions = {
  type: 'postgres',
  url: NODE_ENV === 'development' ? DEV_DATABASE_URI : MAIN_DATABASE_URI,
  port: parseInt(DB_PORT!, 10),
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: [],
  logging: true,
  poolSize: 5,
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

export = config;
