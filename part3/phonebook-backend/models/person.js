/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('conecting to', url);
mongoose
  .connect(url)
  .then(() => {
    console.log('conected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator(entry) {
        const entryArray = entry.split('');

        const guionIndex = entryArray.findIndex((element) => element === '-');

        if (guionIndex < 2 || guionIndex > 3) return false;
        entryArray.splice(guionIndex, 1);

        for (let i = 0; i < entryArray.length; i += 1) {
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(entryArray[i]) === true) return false;
        }
        return true;
      },
      message() {
        return 'Not valid number';
      },
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-sequences
    (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
