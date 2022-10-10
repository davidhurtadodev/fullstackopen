export const Entry = ({ person, handlerDeleteNumber }) => {
  return (
    <p key={person.name}>
      {person.name} {person.number}
      <button onClick={handlerDeleteNumber}>delete</button>
    </p>
  );
};
