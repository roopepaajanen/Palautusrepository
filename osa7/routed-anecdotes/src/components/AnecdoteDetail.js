import React from 'react';
import { useParams } from 'react-router-dom';

const AnecdoteDetail = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id === Number(id));

  if (!anecdote) {
    return <div>Anecdote not found</div>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>For more information see: <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  );
};

export default AnecdoteDetail;
