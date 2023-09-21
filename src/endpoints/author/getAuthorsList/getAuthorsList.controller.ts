import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getAuthorsList.description';
import db from '../../../db';

const getAuthorsList: ControllerType = async (req, res) => {
  const [listResponse, meta] = await db.author.findAndCount();

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(listResponse, { meta }));
};

export default getAuthorsList;
