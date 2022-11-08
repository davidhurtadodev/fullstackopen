/* eslint-disable consistent-return */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const personsRouter = require('./controllers/persons');
const middlewares = require('./utils/middlewares');

const app = express();

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

logger.info('conecting to', config.MONGO_URI);
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info('conected to MongoDB');
  })
  .catch((err) => {
    logger.error('error connecting to DB', err);
  });

morgan.token('createdObject', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :response-time[3] ms :createdObject'));

app.use('/api/persons', personsRouter);

app.use(middlewares.unknownEndpoints);
app.use(middlewares.errorHandler);
