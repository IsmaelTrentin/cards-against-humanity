import { AbstractCard } from './game';

export interface Submission {
  card: AbstractCard;
  at: number;
  by?: string;
  comment?: string;
}
