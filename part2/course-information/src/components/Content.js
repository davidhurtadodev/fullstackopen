import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part part={part} key={part.id} />;
      })}
    </>
  );
};

export default Content;
