import * as typeorm from 'typeorm';

import BaseEntity from '../utils/BaseEntity';
import BookEntity from './BookEntity';

@typeorm.Entity()
class AuthorEntity extends BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
  authorId: number;

  @typeorm.Column({
    type: 'timestamp',
    nullable: true,
  })
  dateOfBirthday: Date;

  @typeorm.Column({
    type: 'text',
    nullable: true,
  })
  firstName?: string;

  @typeorm.Column({
    type: 'text',
    nullable: true,
  })
  lastName?: string;

  @typeorm.ManyToMany(() => BookEntity, (book) => book.authors, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  books?: BookEntity[];
}

export default AuthorEntity;
