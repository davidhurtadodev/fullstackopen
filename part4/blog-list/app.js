const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const app = express();

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middlewares = require('./utils/middleware');

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => {
    logger.error(err);
  });

app.use(cors());
app.use(express.json());
app.use(middlewares.tokenExtractor);

app.use(usersRouter);
app.use(loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use(testingRouter);
}

app.use(middlewares.userExtractor, blogsRouter);

module.exports = app;
