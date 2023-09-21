import HTTP_STATUS_CODES from 'http-status-codes';

import createAndUpdateBook from '../../../services/book/createAndUpdateBook';
import { ControllerType } from './createBook.description';

const createBook: ControllerType = async (req, res) => {
  const data = req.body;

  const newBook = await createAndUpdateBook({ data });

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData(newBook, { message: 'Author created' }));
};

export default createBook;
