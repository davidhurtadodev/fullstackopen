const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/user');

beforeAll((done) => {
  done();
});

const initialUsers = [
  {
    username: 'Prueba1',
    password: 'asd2@ff',
    name: 'Jose Chan',
  },
  {
    username: 'test2',
    password: 'cvfgFasde33',
    name: 'Ana Armas',
  },
];

const api = supertest(app);

describe('creating a user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    let passwordHash = await bcrypt.hash(initialUsers[0].password, 10);
    let userObject = new User({
      username: initialUsers[0].username,
      passwordHash,
      name: initialUsers[0].name,
    });
    await userObject.save();

    passwordHash = await bcrypt.hash(initialUsers[1].password, 10);
    userObject = new User({
      username: initialUsers[1].username,
      passwordHash,
      name: initialUsers[1].name,
    });
    await userObject.save();
  }, 10000);

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({});
    const usersArray = usersAtStart.map((u) => u.toJSON());

    const newUser = {
      username: 'EntroEnPriueba',
      password: 'asd2@ff',
      name: 'Ada K',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    const usersArrayEnd = usersAtEnd.map((u) => u.toJSON());
    expect(usersArrayEnd).toHaveLength(usersArray.length + 1);
    const usernames = usersArrayEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('fails with status code 400 if username its repeated', async () => {
    const newUser = {
      username: 'test2',
      password: 'cvfgFasde33',
      name: 'Mario',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username its not available');

    const usersAtEnd = await User.find({});
    const usersArrayEnd = usersAtEnd.map((u) => u.toJSON());
    expect(usersArrayEnd).toHaveLength(initialUsers.length);
  }, 10000);

  test('fails with username length its less of 4', async () => {
    const usersBeggining = await User.find({});

    const usersArray = usersBeggining.map((u) => u.toJSON());

    const newUser = {
      username: '123',
      password: 'cvfgFasde33',
      name: 'Mario',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'username and password needs at least 4 characters'
    );

    const usersEnd = await User.find({});
    const arrayEnd = usersEnd.map((u) => u.toJSON());

    expect(arrayEnd).toHaveLength(usersArray.length);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
