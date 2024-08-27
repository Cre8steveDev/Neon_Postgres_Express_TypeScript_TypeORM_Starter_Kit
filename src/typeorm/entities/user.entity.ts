import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Book } from './book.entity';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  dateOfBirth!: Date;

  @Column()
  phoneNumber!: string;

  @Column()
  password!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @OneToMany(() => Book, (book) => book.user)
  books!: Book[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
    this.createdAt = new Date();
  }
  @BeforeUpdate()
  updateTime() {
    this.updatedAt = new Date();
  }
}
