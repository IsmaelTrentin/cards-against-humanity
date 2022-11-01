import { Schema, SchemaOptions } from 'mongoose';

import type { AbstractCard } from 'shared-types';

const options: SchemaOptions = {
  collection: 'cards',
  versionKey: false,
};

export const cardSchema = new Schema<AbstractCard>(
  {
    text: {
      type: String,
      required: true,
      maxlength: 200,
    },
    isBlack: {
      type: Boolean,
      required: true,
      default: false,
    },
    blanks: {
      type: [Number],
      required: true,
      default: [],
    },
  },
  options
);
