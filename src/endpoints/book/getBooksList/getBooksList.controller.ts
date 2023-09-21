import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getBooksList.description';
import tokenUtils from '../../../utils/tokenHelper';
import userService from '../../../services/userService';
import config from '../../../config';
import db, { UserEntity } from '../../../db';

const getAuthorsList: ControllerType = async (req, res) => {
  let user: UserEntity;
  try {
    const token = (req.headers.authorization as string || '').replace(/^Bearer /, '');

    const { id } = await tokenUtils.verifyAuthToken(token);

    user = await userService.getUserFromToken(id);
  } catch (err) {
    console.error('err', err.message);
  }

  const [listResponse, meta] = await db.book.findAndCount({
    relations: {
      authors: true,
      genres: true,
    },
    select: {
      title: true,
      yearOfPublication: true,
      fileName: true,
    },
  });

  const booksList = listResponse.map((book) => ({
    ...book,
    fileName: user
      ? `${config.pathToBooks}${book.fileName}`
      : 'the book is available only to registered users',
  }));

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(booksList, { meta }));
};

export default getAuthorsList;
