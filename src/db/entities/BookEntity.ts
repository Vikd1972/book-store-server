import * as typeorm from 'typeorm';

import BaseEntity from '../utils/BaseEntity';

import GenreEntity from './GenreEntity';
import AuthorEntity from './AuthorEntity';

@typeorm.Entity()
class BookEntity extends BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
 bookId: number;

  @typeorm.Column({
    type: 'timestamp',
    nullable: false,
  })
  yearOfPublication: Date;

  @typeorm.Column({
    type: 'text',
    nullable: false,
  })
  title?: string;

  @typeorm.Column({
    type: 'text',
    nullable: true,
    select: false,
  })
  fileName?: string;

  @typeorm.ManyToMany(() => GenreEntity, (genre) => genre.books, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @typeorm.JoinTable()
  genres?: GenreEntity[];

  @typeorm.ManyToMany(() => AuthorEntity, (author) => author.books, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @typeorm.JoinTable()
  authors?: AuthorEntity[];
}

export default BookEntity;
