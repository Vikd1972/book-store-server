import { UserRolesENUM } from '../../../db';
import { createEndpoint } from '../../../services/endpoint';
import controller from './getGenres.controller';
import description from './getGenres.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
    middlewares.checkRole([UserRolesENUM.admin, UserRolesENUM.user]),
  ],
  method: 'get',
  isActive: true,
  path: '/genres',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'Book',
    summary: 'Get a list of genres',
    description: 'Get a list of genres',
  },
}));
