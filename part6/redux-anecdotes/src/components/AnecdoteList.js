import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setAndUnsetNotification } from '../reducers/notificationReducer';

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
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    dispatch(addVote(changedAnecdote));
    dispatch(setAndUnsetNotification(`You voted ${anecdote.content}`, 5));
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
