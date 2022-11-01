import type { ApiResponseError, ObjectLiteral } from 'shared-types';

import { ZodError } from 'zod';

export const buildError = (
  message: string,
  code: number,
  error?: ObjectLiteral | ZodError
): ApiResponseError => {
  const at = Date.now();
  return {
    at,
    message,
    code,
    error: error?.errors || error,
  };
};
