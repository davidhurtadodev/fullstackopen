import { Entry } from './Entry';

export const Numbers = ({ filter, persons, handlerDeleteNumber }) => {
  if (filter === '') {
    return persons.map((person) => {
      return (
        <Entry
          key={person.name}
          person={person}
          handlerDeleteNumber={() => handlerDeleteNumber(person.id)}
        />
      );
    });
  } else {
    return persons
      .filter((person) => {
        return person.name.toLowerCase().includes(filter);
      })
      .map((person) => {
        return (
          <Entry
            person={person}
            handlerDeleteNumber={() => handlerDeleteNumber(person.id)}
            key={person.name}
          />
        );
      });
  }
};
