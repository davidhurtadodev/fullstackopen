import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAnecdoteSubmit = (event) => {
    event.preventDefault();
    if (event.target.anecdote.value) {
      const content = event.target.anecdote.value;
      event.target.anecdote.value = '';
      dispatch(addAnecdote(content));
    }
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
