/* eslint-disable consistent-return */
const personsRouter = require('express').Router();
const logger = require('../utils/logger');
const Person = require('../models/person');

personsRouter.get('/', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((err) => next(err));
});

personsRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      logger.info(person);
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((err) => next(err));
});

personsRouter.get('/info', (req, res, next) => {
  const date = new Date();
  Person.find({})
    .then((people) => {
      res.send(`Phonebook has info for ${people.length} people ${date}`);
    })
    .catch((err) => next(err));
});

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      logger.info(result);
      res.status(204).end();
    })
    .catch((err) => next(err));
});

personsRouter.post('/', (req, res, next) => {
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

personsRouter.put('/:id', (req, res, next) => {
  logger.info('entro put');
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

module.exports = personsRouter;
