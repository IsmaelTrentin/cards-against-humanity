import { cardPostSchema } from '../card';
import { z } from 'zod';

export const submissionPostSchema = z.object({
  card: cardPostSchema,
  by: z.string().min(1).max(32).optional(),
  comment: z.string().min(1).max(256).optional(),
  at: z.number().default(Date.now()),
});
