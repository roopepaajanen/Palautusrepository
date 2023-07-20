import { useSelector, useDispatch } from 'react-redux'

const Anecdote = ({ anecdote }) => {
    const anecdotes = useSelector((state) => state);
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
    const dispatch = useDispatch();

    const handleVote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
      }
      
    return (
        <><h2>Anecdotes</h2>
        {sortedAnecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div></>
        ))}
    )
}