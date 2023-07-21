import React from 'react';
import { Link } from 'react-router-dom';

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <h3>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </h3>
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
