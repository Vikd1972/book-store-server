import HTTP_STATUS_CODES from 'http-status-codes';

import db, { AuthorEntity } from '../../../db';
import { ControllerType } from './createAuthor.description';

const createAuthor: ControllerType = async (req, res) => {
  let newAuthor = new AuthorEntity();

  newAuthor = {
    ...newAuthor,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirthday: new Date(req.body.dateOfBirthday),

  };

  const author = await db.author.create({ ...newAuthor });

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData(author, { message: 'Author created' }));
};

export default createAuthor;
