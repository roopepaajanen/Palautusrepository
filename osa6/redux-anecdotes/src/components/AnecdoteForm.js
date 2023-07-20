import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdoteAsync } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdoteHandler = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addAnecdoteAsync(content));
    
    // Show notification when adding an anecdote
    dispatch(setNotification(`New anecdote added: "${content}"`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000); // Remove notification after 5 seconds
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdoteHandler}>
        <div>
          New anecdote:<input name="anecdote" />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
