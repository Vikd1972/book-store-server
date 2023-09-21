import db from '../../index';
import asyncForEach from '../../../utils/asyncForEach';

const genres = [
  {
    genre: 'Detective',
  },
  {
    genre: 'Sci-fi',
  },
  {
    genre: 'Fantasy',
  },
  {
    genre: 'Western',
  },
  {
    genre: 'Horror',
  },
  {
    genre: 'Classic',
  },
];

const createGenres = async () => {
  await asyncForEach(
    genres,
    async (item) => {
      await db.genre.create({
        genre: item.genre,
      });
    },
  );
};

export default createGenres;
