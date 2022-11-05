import { AbstractCard } from './game';

export interface Submission {
  _id: string;
  card: AbstractCard;
  at: number;
  by?: string;
  comment?: string;
}
