import express from 'express';
import {pinoHttp, logger} from './utils/logging.js';

const app = express();

app.use(pinoHttp);

app.get('/', async (req, res) => {
  logger.info({logField: 'custom-entry', arbitraryField: 'custom-entry'}); 
  req.log.info('Child logger with trace Id.'); 
  res.send('Hello World!');
});

export default app;