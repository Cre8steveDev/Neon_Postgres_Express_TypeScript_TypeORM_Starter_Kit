import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';

@Entity()
export class Book {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.books)
  user!: User;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
