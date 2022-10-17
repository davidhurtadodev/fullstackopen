/* eslint-disable consistent-return */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

// const { response } = require('express');

// eslint-disable-next-line consistent-return
morgan.token('createdObject', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
});

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :response-time[3] ms :createdObject'));

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      console.log(person);
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((err) => next(err));
});

app.get('/info', (req, res, next) => {
  const date = new Date();
  Person.find({})
    .then((people) => {
      res.send(`Phonebook has info for ${people.length} people ${date}`);
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  Person.findOne({ name: body.name })
    .then((response) => {
      if (response) {
        return res.status(409).json({
          error: 'Repeated Content',
        });
      }
    })
    .then(() => {
      person
        .save()
        .then((savedPerson) => {
          res.json(savedPerson);
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      next(err);
    });
});

app.put('/api/persons/:id', (req, res, next) => {
  console.log('entro put');
  const { body } = req;

  Person.findOneAndUpdate(
    { name: body.name },
    { name: body.name, number: body.number },
    { new: true, runValidators: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const unknownEndpoints = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoints);

const errorHandler = (err, req, res, next) => {
  console.error(err, 'Entra error handler');

  if (err.name === 'CastError') {
    return res.status(404).send({ error: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    console.log('Entra a validation');
    return res.status(400).json({ error: err.message });
  }

  return next(err);
};

app.use(errorHandler);
