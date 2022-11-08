/* eslint no-underscore-dangle: 0 */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization');

//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7);
//   }
//   return null;
// };

blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({})
    .populate('user')
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.post('/api/blogs', async (request, response) => {
  console.log('create');
  const { body } = request;

  // const decodedToken = await jwt.verify(request.token, process.env.SECRET);

  if (!request.user.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(request.user.id);

  if (body.title === undefined) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const blog = new Blog({
    url: body.url,
    title: body.title,
    // author: request.user.username,
    author: body.author,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/api/blogs/:id', async (request, response, next) => {
  if (!request.user.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: 'unathorized user',
    });
  }

  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// eslint-disable-next-line consistent-return
blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
  const { likes, user, author, title, url } = request.body;

  if (typeof likes !== 'number') return response.status(400).end();
  console.log(request.params.id);
  const blog = {
    likes: likes,
    user: user,
    author: author,
    title: title,
    url: url,
  };

  Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
