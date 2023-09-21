import { createEndpoint } from '../../../services/endpoint';
import controller from './getBooksList.controller';
import description from './getBooksList.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
  ],
  method: 'get',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'Book',
    summary: 'Get a list of books',
    description: 'Get a list of books',
  },
}));
