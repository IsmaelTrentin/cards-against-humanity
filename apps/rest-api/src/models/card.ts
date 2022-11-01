import type { AbstractCard } from 'shared-types';
import { cardSchema } from '../schemas/card';
import mongoose from 'mongoose';

export const Card = mongoose.model<AbstractCard>('Card', cardSchema);
