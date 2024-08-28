import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Book } from './book.entity';

@Entity()
export class User {
  //https://typeorm.io/entities#entity-columns
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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Book, (book) => book.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  books!: Book[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}

// Learn more about Column types for Postgres
// https://typeorm.io/entities#column-types-for-postgres
