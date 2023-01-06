import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotesService';

const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    vote(state, action) {
      const changedAnecdote = action.payload;

      // const anecdoteToChange = state.find((a) => a.id === id);
      // const changedAnecdote = {
      //   ...anecdoteToChange,
      //   votes: anecdoteToChange.votes + 1,
      // };

      return (state = state.map((anecdote) =>
        anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
      ));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addAnecdote, vote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createAnecdote(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const addVote = (changedAnecdote) => {
  return async (dispatch) => {
    await anecdotesService.addVote(changedAnecdote);
    dispatch(vote(changedAnecdote));
  };
};
