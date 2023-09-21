import * as Sentry from '@sentry/node';
import { CaptureContext } from '@sentry/types';

import config from '../../config';
import { logger } from '../../utils';

let initErrorMessage = '';

try {
  Sentry.init({
    dsn: config.sentryDsn,
  });
} catch (err) {
  initErrorMessage = err.message;
  if (!/^Invalid Sentry Dsn/i.test(initErrorMessage)) {
    logger.error(err);
  }
  logger.warn('Sentry initialization FAILED with error: ', err.message);
}

const captureInfo = (
  message: string,
  captureContext?: CaptureContext,
): void => {
  if (initErrorMessage) {
    logger.warn('Sentry service was not initialized: ', initErrorMessage);
    return;
  }

  try {
    Sentry.captureMessage(message, captureContext);
  } catch (err) {
    logger.error('Sentry capturing info error', err.message);
  }
};

const captureError = (
  exception: Error,
  captureContext?: CaptureContext,
): void => {
  if (initErrorMessage) {
    logger.warn('Sentry service was not initialized: ', initErrorMessage);
    return;
  }

  try {
    Sentry.captureException(exception, captureContext);
  } catch (error) {
    logger.error('Sentry capturing exception error', error.message);
  }
};

export default {
  captureInfo,
  captureError,
};
