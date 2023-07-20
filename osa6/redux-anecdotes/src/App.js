import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { voteAnecdote, addAnecdote, getId } from './reducers/anecdoteReducer'; 
import NewAnecdote from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
  };

  const handleAddAnecdote = (event) => {
    event.preventDefault();
    console.log('addAnecdote', event.target.anecdote.value);
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <NewAnecdote />
    </div>
  );
};

export default App;
