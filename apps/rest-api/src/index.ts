import { Express } from 'express';
import app from './app';
import { connect } from './services/db';
import http from 'http';
import logger from '@note-dev-org/service-logger';

// Listen port.
const port = process.env.PORT || 2424;
// Function for creating a server,
// needs an Express app.
const createServer = (app: Express) => {
  logger.info('Starting API...', { at: 'createServer' });
  logger.info(`Env: ${process.env.NODE_ENV}`, { at: 'createServer' });
  logger.info(`Base: ${process.env.BASE_URL}`, { at: 'createServer' });
  logger.info(`Port: ${port}`, { at: 'createServer' });
  const server = http.createServer(app);
  server.listen(port, () =>
    logger.info('Server up and listening', { at: 'createServer' })
  );
  server.on('error', err => logger.error(`${err}`, { at: 'createServer' }));
  if (process.env.NODE_ENV !== 'production') {
    logger.warn(`App is running in dev/test mode!`, {
      at: 'createServer',
    });
  }
};

// Create and start the server.
createServer(app);
// Connect to db
connect().catch(err => logger.error(`${err}`));
