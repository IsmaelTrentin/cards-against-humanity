import { AbstractCard } from './game';

export interface Submission {
  _id: string;
  card: Omit<AbstractCard, '_id'>;
  at: number;
  by?: string;
  comment?: string;
}
