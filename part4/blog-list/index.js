const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const { info } = require('./utils/logger');
const { PORT, MONGO_URI } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(blogsRouter);

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
