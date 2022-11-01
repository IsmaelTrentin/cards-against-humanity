import { buildError } from '../utils/build.error';
import logger from '@note-dev-org/service-logger';
import mongoose from 'mongoose';

export const connect = async () => {
  let url =
    process.env.NODE_ENV !== 'production'
      ? process.env.DB_URL_TEST
      : process.env.DB_URL;
  if (!url) {
    const err = buildError('No db url provided in .env', 500);
    throw err;
  }
  url = url.replace('<password>', process.env.DB_PWD as string);
  const instance = await mongoose.connect(url);
  const con = instance.connection;
  logger.info(
    `Connected to DB: ${con.host}:${con.port}/${con.db?.databaseName}`,
    { at: 'db.connect' }
  );
  return con;
};
