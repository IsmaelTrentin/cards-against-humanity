import { Schema, SchemaOptions } from 'mongoose';

import type { Submission } from 'shared-types';
import { cardSchema } from '../card';

const options: SchemaOptions = {
  collection: 'submissions',
  versionKey: false,
};

const cardSchemaNoId = { ...cardSchema.obj };
delete cardSchemaNoId._id;

export const submissionSchema = new Schema<Submission>(
  {
    card: cardSchemaNoId,
    at: {
      default: Date.now(),
      type: Number,
      required: true,
    },
    by: {
      type: String,
      required: false,
      maxlength: 32,
      minlength: 1,
    },
    comment: {
      type: String,
      required: false,
      maxlength: 256,
      minlength: 1,
    },
  },
  options
);
