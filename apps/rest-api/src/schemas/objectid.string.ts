import { z } from 'zod';

export const objectIdStringSchema = z.string().min(24).max(24);
