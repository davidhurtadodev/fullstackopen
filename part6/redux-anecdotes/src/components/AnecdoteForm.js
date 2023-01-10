import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setAndUnsetNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();
  const handleAnecdoteSubmit = async (event) => {
    event.preventDefault();
    if (event.target.anecdote.value) {
      const content = event.target.anecdote.value;
      event.target.anecdote.value = '';
      props.createAnecdote(content);
      props.setAndUnsetNotification(`${content} anecdote created `, 5);
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

// export default AnecdoteForm;

const mapDispatchToProps = {
  createAnecdote,
  setAndUnsetNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
