const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Awesome blog',
    author: 'Awesome author',
    likes: 10,
  },
  {
    title: 'Boring blog',
    author: 'Darth Vader',
    likes: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
}, 10000);

const api = supertest(app);

describe('test blog api with database', () => {
  test('return all notes in JSON format', async () => {
    const response = await api.get('/api/blogs');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveLength(2);
  }, 10000);

  test('verify id property existence', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('create a new blog entry', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'Post test',
        author: 'Post author',
        likes: 1,
      })
      .expect(201);

    const response = await api.get('/api/blogs');

    const contents = response.body.map((blog) => blog.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain('Post test');
  });

  test('if like property is missing default it to 0', async () => {
    const blogEntry = {
      title: 'We dont have likes',
      author: 'Anonymous',
    };

    await api.post('/api/blogs').send(blogEntry);

    const response = await api.get('/api/blogs');
    const likes = response.body.map((entry) => entry.likes);
    expect(likes[likes.length - 1]).toBe(0);
  });

  test('if title or content its missing, expect http 400 response', async () => {
    const blogsEntries = [
      {
        title: 'We dont have likes',
        likes: 1,
      },
      {
        author: 'Im author',
        likes: 2,
      },
    ];
    const promiseArray = await Promise.all(
      blogsEntries.map((blog) => api.post('/api/blogs').send(blog))
    );
    const statusArray = promiseArray.map((promise) => promise.res.statusCode);
    statusArray.forEach((status) => {
      expect(status).toBe(400);
    });
  });

  test('delete an entry', async () => {
    const { body: blogs } = await api.get('/api/blogs');

    const idFirstEntry = blogs[0].id;
    await api.delete(`/api/blogs/${idFirstEntry}`);
    const { body: blogsAfterDelete } = await api.get('/api/blogs');

    expect(blogsAfterDelete.length).toBe(initialBlogs.length - 1);
  });

  test('update id', async () => {
    const { body: blogs } = await api.get('/api/blogs');

    const idFirstEntry = blogs[0].id;

    await api
      .put(`/api/blogs/${idFirstEntry}`)
      .send({ likes: 101 })
      .expect(200);
    // console.log(response.body);
    const newResponse = await api.get('/api/blogs');

    expect(newResponse.body[0].likes).toBe(101);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
