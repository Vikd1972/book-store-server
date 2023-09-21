import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './deleteAuthor.description';
import db from '../../../db';

const deleteAuthor: ControllerType = async (req, res) => {
  const isHardDelete = req.query.hardDelete === 'true';
  const bookId = +req.params.bookId;

  if (isHardDelete) {
    await db.book.hardDelete(bookId);
  } else {
    await db.book.softDelete(bookId);
  }

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData('Book deleted'));
};

export default deleteAuthor;
