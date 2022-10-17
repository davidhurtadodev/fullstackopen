const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password> <name> <number>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://davidhuertado:${password}@cluster0.wxoxdsb.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('here2');
  Person.find({}).then((people) => {
    console.log('here');
    people.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
  console.log('end');
}

if (process.argv.length > 3) {
  console.log('here1');
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected');

      const person = new Person({
        name: process.argv[3],
        number: Number(process.argv[4]),
      });

      return person.save();
    })
    .then(() => {
      console.log(
        `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
      );
      return mongoose.connection.close();
    })
    .catch((err) => console.error(err));
}
