import { z } from 'zod';

export const cardPostSchema = z
  .object({
    text: z.string().min(1).max(200),
    isBlack: z.boolean(),
    blanks: z.array(z.number()).default([]),
  })
  .refine(schema => (schema.isBlack ? schema.blanks.length > 0 : true), {
    message: 'A black card must have at least one blank',
    path: ['blanks'],
  })
  .refine(schema => (!schema.isBlack ? schema.blanks.length === 0 : true), {
    message: 'A white card cannot have blanks',
    path: ['blanks'],
  });
