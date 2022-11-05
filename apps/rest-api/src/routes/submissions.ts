import { Card } from '../models/card';
import { FilterQuery } from 'mongoose';
import { Router } from 'express';
import { Submission } from '../models/submission';
import type { Submission as SubmissionType } from 'shared-types';
import { ZodError } from 'zod';
import { buildError } from '../utils/build.error';
import { buildResponse } from '../utils/build.response';
import { objectIdStringSchema } from '../schemas/objectid.string';
import { removeDuplicates } from '../utils/array';
import { submissionPostSchema } from '../schemas/submission';

const router = Router();
const mainRoute = '/submissions';

// get all submissions
router.get(mainRoute, async (req, res) => {
  // parse query params
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const type = parseInt(req.query.type as string);
  const text = req.query.text as string | undefined;

  // calculate indexes
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // query result
  const filter: FilterQuery<SubmissionType> = {
    card: {},
  };
  if (type === 2) {
    delete filter.card;
  }
  type === 0 && (filter.card.isBlack = true);
  type === 1 && (filter.card.isBlack = false);
  text && (filter.card.text = { $regex: text });
  const submissions = await Submission.find(filter).sort('_id').exec();
  const result =
    page != null ? submissions.slice(startIndex, endIndex) : submissions;

  // calculate pages
  const pagesData = {
    nextPage: endIndex < submissions.length ? page + 1 : undefined,
    prevPage: Math.max(1, page - 1),
  };

  // return results
  const resData = buildResponse(result, 200, { ...pagesData });
  return res.status(resData.code).json(resData);
});

// accept or refuse submission
router.delete(`${mainRoute}/:action/:_id`, async (req, res, next) => {
  const { action, _id } = req.params;

  // handle action not recognized
  if (action !== 'accept' && action !== 'refuse') {
    const err = buildError('Not Found', 404);
    return res.status(err.code).json(err);
  }

  const accept = action === 'accept';
  let parsedId;

  // parse request _id
  try {
    parsedId = objectIdStringSchema.parse(_id);
  } catch (error) {
    // handle parse error
    const err = buildError('Invalid _id', 400, error as ZodError);
    return res.status(err.code).json(err);
  }

  try {
    // get submission by provided _id
    const submission = await Submission.findOne({ _id: parsedId });
    if (submission == null) {
      const err = buildError(`Submission ${parsedId} not found`, 404);
      return res.status(err.code).json(err);
    }

    let cardDoc;
    if (accept) {
      // check if card already exists
      const exists = await Card.findOne({ text: submission.card.text });
      if (exists != null) {
        const err = buildError(
          'A card with same properties already exists',
          409
        );
        return res.status(err.code).json(err);
      }

      // write submission card to db
      const cardModel = new Card(submission.card);
      cardDoc = await cardModel.save();
    }

    // delete submission
    const oldSub = await submission.delete();

    // set data to old sub if no card was created
    if (!accept) {
      cardDoc = oldSub;
    }

    // return card data
    const resData = buildResponse(cardDoc, 200);
    return res.status(resData.code).json(resData);
  } catch (error) {
    next(error);
  }
});

// post submission
router.post(mainRoute, async (req, res) => {
  const { body } = req;
  let parsed;

  // parse body
  try {
    parsed = submissionPostSchema.parse(body);
  } catch (error) {
    // handle bad body
    const { errors } = error as ZodError;
    const err = buildError('Invalid submission data', 400, errors);
    return res.status(err.code).json(err);
  }

  const { card } = parsed;

  // check if card with same text is already in db
  const cardAlreadyExists = await Card.findOne({ text: card.text });
  if (cardAlreadyExists != null) {
    const err = buildError('A card with same properties already exists', 409);
    return res.status(err.code).json(err);
  }
  // check if submission with same text is already in db
  const submissionAlreadyExists = await Submission.findOne({
    'card.text': card.text,
  });
  if (submissionAlreadyExists != null) {
    const err = buildError(
      'A submission with the same text already exists',
      409
    );
    return res.status(err.code).json(err);
  }

  // fix duplicate blanks
  card.blanks = removeDuplicates(card.blanks);

  // create submission and write to db
  const submissionModel = new Submission(parsed);
  const submissionDoc = await submissionModel.save();

  // return submission
  const resData = buildResponse(submissionDoc, 201);
  return res.status(resData.code).json(resData);
});

export default router;
