import { ErrorRequestHandler } from 'express';
import { buildError } from '../utils/build.error';
import httpLogger from '@note-dev-org/http-logger';

export const errorMW: ErrorRequestHandler = (error, req, res, next) => {
  httpLogger.error(`${error}`, { at: 'mw.error' });
  const errorResponse = buildError(
    error.message || 'Internal error',
    error.code || 500
  );

  return res.status(errorResponse.code).json(errorResponse);
};
