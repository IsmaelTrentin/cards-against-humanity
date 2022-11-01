import { FilterQuery, MongooseError } from 'mongoose';

import type { AbstractCard } from 'shared-types';
import { Card } from '../models/card';
import { Router } from 'express';
import { ZodError } from 'zod';
import { buildError } from '../utils/build.error';
import { buildResponse } from '../utils/build.response';
import { cardPostSchema } from '../schemas/card';
import { objectIdStringSchema } from '../schemas/objectid.string';
import { removeDuplicates } from '../utils/array';

const router = Router();
const mainRoute = '/cards';

// GET all cards
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
  const filter: FilterQuery<AbstractCard> = {};
  type === 0 && (filter.isBlack = true);
  type === 1 && (filter.isBlack = false);
  text && (filter.text = { $regex: text });
  const cards = await Card.find(filter).sort('_id').exec();
  const result = page != null ? cards.slice(startIndex, endIndex) : cards;

  // calculate pages
  const pagesData = {
    nextPage: endIndex < cards.length ? page + 1 : undefined,
    prevPage: Math.max(1, page - 1),
  };

  // return results
  const resData = buildResponse(result, 200, { ...pagesData });
  return res.status(resData.code).json(resData);
});

// GET single card
router.get(`${mainRoute}/:_id`, async (req, res) => {
  const { _id } = req.params;
  let parsedId;

  // parse request _id
  try {
    parsedId = objectIdStringSchema.parse(_id);
  } catch (error) {
    // handle parse error
    const err = buildError('Invalid _id', 400, error as ZodError);
    return res.status(err.code).json(err);
  }

  // find card by _id
  const card = await Card.findOne({ _id: parsedId });

  // handle card not existing
  if (card == null) {
    const err = buildError(`Card #${parsedId} not found`, 404);
    return res.status(err.code).json(err);
  }

  // return result
  const resData = buildResponse(card, 200);
  return res.status(resData.code).json(resData);
});

// POST card
router.post(mainRoute, async (req, res) => {
  const { card } = req.body;
  let cardData;

  try {
    // parse card data from body
    cardData = cardPostSchema.parse(card);
  } catch (error) {
    // handle parse error
    const { errors } = error as ZodError;
    const err = buildError('Invalid card data', 400, errors);
    return res.status(err.code).json(err);
  }

  // fix duplicate blanks
  cardData.blanks = removeDuplicates(cardData.blanks);

  // check if card with same text is already in db
  const alreadyExists = await Card.findOne({ text: cardData.text });
  if (alreadyExists != null) {
    const err = buildError('A card with same properties already exists', 409);
    return res.status(err.code).json(err);
  }

  try {
    // create card document
    const cardDocument = await new Card({
      ...cardData,
    }).save();

    // return posted card document
    const resData = buildResponse(cardDocument, 200);
    return res.status(resData.code).json(resData);
  } catch (error) {
    const err = buildError((error as MongooseError).message, 500);
    return res.status(err.code).json(err);
  }
});

export default router;
