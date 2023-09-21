import { logger } from '../../utils';
import sentry from './sentry';

const addUnhandledRejectionHandler = () => {
  process.on('unhandledRejection', (err, p) => {
    logger.error('🚧  UnhandledPromiseRejectionWarning: Unhandled promise rejection 🚧', err, p);
    sentry.captureError(
      err as Error,
      {
        tags: {
          capturedIn: 'Server Unhandled promise rejection',
        },
      },
    );
  });
};

export default addUnhandledRejectionHandler;
