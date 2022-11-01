import type { Submission as SubmissionType } from 'shared-types';
import mongoose from 'mongoose';
import { submissionSchema } from '../schemas/submission';

export const Submission = mongoose.model<SubmissionType>(
  'Submission',
  submissionSchema
);
