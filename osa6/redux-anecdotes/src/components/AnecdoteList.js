import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes.anecdotes);
  const filter = useSelector((state) => state.anecdotes.filter); // Get the filter value from the state
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
    // Show notification when adding an anecdote
    dispatch(setNotification(`You voted: "${anecdotes.find((anecdote) => anecdote.id === id).content}"`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000); // Remove notification after 5 seconds
  };
  const filteredAnecdotes = filter
    ? sortedAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    : sortedAnecdotes;

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVote(anecdote.id)} />
      ))}
    </div>
  );
};

export default AnecdoteList;
