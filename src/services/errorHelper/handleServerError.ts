import { Application } from 'express';

import sentry from './sentry';
import { logger } from '../../utils';

const handleServerError = (err: Application) => {
  logger.error('Error starting the server: ', err);
  sentry.captureError(
    err as unknown as Error,
    {
      tags: {
        capturedIn: 'Error starting the server',
      },
    },
  );
};

export default handleServerError;
