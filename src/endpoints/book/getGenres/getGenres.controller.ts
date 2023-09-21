import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getGenres.description';
import db from '../../../db';

const getGenres: ControllerType = async (req, res) => {
  const [listResponse, meta] = await db.genre.findAndCount();

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(listResponse, { meta }));
};

export default getGenres;
