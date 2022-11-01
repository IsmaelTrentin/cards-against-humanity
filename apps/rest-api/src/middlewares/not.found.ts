import { Request, Response } from 'express';

import { buildError } from '../utils/build.error';

export const notFoundMW = (_req: Request, res: Response) => {
  const errorResponse = buildError('Not found', 404);
  return res.status(errorResponse.code).json(errorResponse);
};
