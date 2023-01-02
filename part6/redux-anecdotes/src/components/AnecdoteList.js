import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredNotes =
    filter === ''
      ? anecdotes
      : anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  const anecdotesToSort = [...filteredNotes];

  anecdotesToSort.sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setNotification(`You voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 5000);
  };
  return (
    <div>
      {anecdotesToSort.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
