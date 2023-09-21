import UserEntity from './entities/UserEntity';
import UserRoleEntity from './entities/UserRoleEntity';
import AuthorEntity from './entities/AuthorEntity';
import BookEntity from './entities/BookEntity';
import GenreEntity from './entities/GenreEntity';

import BaseRepository from './utils/BaseRepository';

export { default as dataSource } from './utils/dataSource';
export { default as connectToDb } from './utils/connectToDb';
export { FindAndCountMetaType } from './utils/BaseRepository';

// Entities reexport START
export { default as UserEntity } from './entities/UserEntity';
export { default as AuthorEntity } from './entities/AuthorEntity';
export { default as BookEntity } from './entities/BookEntity';
export { default as GenreEntity } from './entities/GenreEntity';
export { default as UserRoleEntity, UserRolesENUM } from './entities/UserRoleEntity';
// Entities reexport END

export default {
  user: new BaseRepository(UserEntity),
  author: new BaseRepository(AuthorEntity),
  book: new BaseRepository(BookEntity),
  genre: new BaseRepository(GenreEntity),
  userRole: new BaseRepository(UserRoleEntity),
};
