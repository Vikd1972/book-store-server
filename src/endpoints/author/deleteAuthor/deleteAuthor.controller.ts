import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './deleteAuthor.description';
import db from '../../../db';

const deleteAuthor: ControllerType = async (req, res) => {
  const isHardDelete = req.query.hardDelete === 'true';
  const authorId = +req.params.authorId;

  if (isHardDelete) {
    await db.author.hardDelete(authorId);
  } else {
    await db.author.softDelete(authorId);
  }

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData('Author deleted'));
};

export default deleteAuthor;
