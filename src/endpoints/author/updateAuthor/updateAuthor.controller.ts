import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './updateAuthor.description';
import db from '../../../db';

const updateUAuthor: ControllerType = async (req, res) => {
  const authorId = +req.params.authorId;

  const author = await db.author.findByPk(authorId);

  await db.author.update(authorId, {
    ...author,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirthday: new Date(req.body.dateOfBirthday),
  });

  const updatedAuthor = await db.author.findByPk(authorId);

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(updatedAuthor));
};

export default updateUAuthor;
