import cardsRouter from './routes/cards';
import cors from 'cors';
import { errorMW } from './middlewares/error';
import express from 'express';
import { logMW } from './middlewares/log';
import logger from '@note-dev-org/service-logger';
import { notFoundMW } from './middlewares/not.found';
import submissionsRouter from './routes/submissions';

const app = express();
const { BASE_URL } = process.env;

if (BASE_URL == undefined) {
  logger.error('Base url not provided', { at: 'app' });
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(logMW);

app.get(BASE_URL + '/test', (_, res) => {
  return res.status(200).json({ message: 'ok!' });
});

app.use(BASE_URL, cardsRouter);
app.use(BASE_URL, submissionsRouter);

app.use(notFoundMW);

app.use(errorMW);

export default app;
