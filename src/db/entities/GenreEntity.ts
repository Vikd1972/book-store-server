import * as typeorm from 'typeorm';

import BaseEntity from '../utils/BaseEntity';
import BookEntity from './BookEntity';

@typeorm.Entity()
class GenreEntity extends BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
  genreId: number;

  @typeorm.Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  genre: string;

  @typeorm.ManyToMany(() => BookEntity, (book) => book.genres, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  books?: BookEntity[];
}

export default GenreEntity;
