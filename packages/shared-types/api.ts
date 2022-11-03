import { ObjectLiteral } from './util';

export interface Timestampable {
  at: number;
}

export interface ApiResponse extends Timestampable {
  code: number;
  data: Record<string, any>;
}

export interface ApiResponseError extends Timestampable {
  code: number;
  message: string;
  error?: ObjectLiteral;
}

export interface PagedResponse<T> extends ApiResponse {
  data: T[];
  nextPage: number;
  previousPage: number;
}
