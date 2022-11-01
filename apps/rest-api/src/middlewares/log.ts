import { NextFunction, Request, Response } from 'express';

import httpLogger from '@note-dev-org/http-logger';

export const logMW = (req: Request, res: Response, next: NextFunction) => {
  const { url, ip, method, body } = req;
  const timeStart = Date.now();
  const bodyBuffer = Buffer.from(
    Object.keys(body).length > 0 ? JSON.stringify(body) : []
  );
  let finished = false;
  res.on('finish', () => {
    const { statusCode } = res;
    const durationMs = Date.now() - timeStart;
    httpLogger.info(
      `${statusCode} ${method} ${ip} ${durationMs}ms ${bodyBuffer.length}b`,
      { at: url }
    );
    finished = true;
  });
  res.on('close', () => {
    if (finished) return;
    httpLogger.info(`--- ${method} ${ip} - ${bodyBuffer.length}b`, { at: url });
  });
  next();
};
