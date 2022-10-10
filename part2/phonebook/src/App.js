import { useState } from 'react';
import { Input } from './components/Input';
import { Form } from './components/Form';
import { Numbers } from './components/Numbers';
import { useEffect } from 'react';
import { numbersService } from './services/numbers';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationName, setNotificationName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    numbersService.getAll().then((data) => setPersons(data));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const repeatedNameIndex = persons.findIndex(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (repeatedNameIndex === -1) {
      const newPersonObject = { name: newName, number: newNumber };
      numbersService.create(newPersonObject).then((data) => {
        setPersons([...persons, data]);
        setNotificationName(data.name);
        setNewName('');
        setNewNumber('');
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedEntry = {
          ...persons[repeatedNameIndex],
          number: newNumber,
        };
        numbersService
          .replaceNumber(persons[repeatedNameIndex].id, changedEntry)
          .then((data) =>
            setPersons(
              persons.map((person) =>
                person.id !== persons[repeatedNameIndex].id ? person : data
              )
            )
          );
      }
    }
  };
  const handleNameChange = (e) => {
    const name = e.target.value;
    setNewName(name);
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handlerDeleteNumber = (id) => {
    if (window.confirm('Do you want to delete an entry?')) {
      numbersService
        .deleteEntry(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => {
          const deletedEntryIndex = persons.findIndex(
            (person) => person.id === id
          );
          setErrorMsg(`${persons[deletedEntryIndex].name} its already deleted`);
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
          setPersons(
            persons.filter((person, index) => index !== deletedEntryIndex)
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationName={notificationName} errorMsg={errorMsg} />
      <Input
        text={'filter shown with'}
        value={filter}
        onChangeFunction={handleFilterChange}
      />
      <Form onSubmitFunction={addName}>
        <Input
          text={'name: '}
          value={newName}
          onChangeFunction={handleNameChange}
        />
        <Input
          text={'number: '}
          value={newNumber}
          onChangeFunction={handleNumberChange}
        />
      </Form>
      <h2>Numbers</h2>
      <Numbers
        filter={filter}
        persons={persons}
        handlerDeleteNumber={handlerDeleteNumber}
      />
    </div>
  );
};

export default App;
