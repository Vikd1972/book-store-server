import HTTP_STATUS_CODES from 'http-status-codes';

import createAndUpdateBook from '../../../services/book/createAndUpdateBook';
import { ControllerType } from './updateBook.description';

const updateBook: ControllerType = async (req, res) => {
  const data = req.body;
  const bookId = +req.params.bookId;

  const updatedBook = await createAndUpdateBook({
    data,
    bookId,
  });

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(updatedBook));
};

export default updateBook;
