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
