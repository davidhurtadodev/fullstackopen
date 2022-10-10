import React from 'react';

const Total = ({ parts }) => {
  const total = parts.reduce((previous, actual) => {
    return previous + actual.exercises;
  }, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

export default Total;
