const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/api/users', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

usersRouter.post('/api/users', async (request, response) => {
  const { body } = request;

  if (!body.username || !body.password) {
    return response.status(400).json({
      error: 'content missing',
    });
  }
  if (body.username.length < 4 || body.password.length < 4) {
    return response.status(400).json({
      error: 'username and password needs at least 4 characters',
    });
  }

  const isRepeated = await User.findOne({ username: body.username });

  if (isRepeated) {
    return response.status(400).json({
      error: 'username its not available',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
