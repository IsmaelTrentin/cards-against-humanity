import type { ApiResponse } from 'shared-types';

export const buildResponse = (
  data: Record<string, any>,
  code: number,
  other?: Record<string, any>
): ApiResponse => {
  const at = Date.now();
  return {
    at,
    code,
    data,
    ...other,
  };
};
