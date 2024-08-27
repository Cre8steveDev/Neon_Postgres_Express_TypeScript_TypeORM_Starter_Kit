import { DataSource } from 'typeorm';
import config from './config/config';
import { User } from './entities/user.entity';

export const DB = new DataSource(config);
