import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getOneAuthor.description';
import db from '../../../db';

const getOne: ControllerType = async (req, res) => {
  const withDeleted = req.query.withDeleted === 'true';

  const author = await db.author.findByPk(+req.params.authorId, {
    withDeleted,
  });

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(author));
};

export default getOne;
