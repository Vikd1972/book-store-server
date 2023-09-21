import db, { BookEntity } from '../../db';
import saveTextToFile from './saveTextToFile';

type PropsType = {
  data: {
    title?: string;
    text?: string;
    yearOfPublication?: Date;
    genres?: number[];
    authors?: number[];
  }
  bookId?: number;
}
const createAndUpdateBook = async (props: PropsType) => {
  let book = new BookEntity();

  if (props.bookId) {
    book = await db.book.findByPk(props.bookId);
  }

  const genreIds = props.data.genres || [0];
  const genres = await db.genre
    .createQueryBuilder('genre')
    .where('genre.genreId IN (:...genreIds)', { genreIds })
    .getMany();

  const authorIds = props.data.authors || [0];
  const authors = await db.author
    .createQueryBuilder('author')
    .where('author.authorId IN (:...authorIds)', { authorIds })
    .getMany();

  const fileName = saveTextToFile(props.data.title, props.data.text);

  const newBook: BookEntity = {
    ...book,
    title: props.data.title && props.data.title,
    yearOfPublication: props.data.yearOfPublication && new Date(props.data.yearOfPublication),
    genres: props.data.genres && genres,
    authors: props.data.authors && authors,
    fileName: props.data.title && props.data.text && fileName,
  };

  let currentBook: BookEntity;

  if (props.bookId) {
    await db.book.update(props.bookId, newBook);
    currentBook = await db.book.findByPk(props.bookId);
  } else {
    currentBook = await db.book.create(newBook);
  }

  return currentBook;
};

export default createAndUpdateBook;
