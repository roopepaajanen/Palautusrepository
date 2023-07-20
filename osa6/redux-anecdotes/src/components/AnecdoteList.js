import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'
import AnecdotesFilter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const onVoteClick = anecdote => {
    const id = anecdote.id
    dispatch(vote(id))
    dispatch(setNotification(`You voted anecdote "${anecdote.content}"`, 10))
  }

  const sortedAnecdotes = anecdotes;
  sortedAnecdotes.sort((a, b) => b.votes - a.votes)

  return <div>
    <AnecdotesFilter />
    {sortedAnecdotes.map(anecdote => {
      if (!anecdote.content.toLowerCase().includes(filter)) {
        return null
      }
      return <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => onVoteClick(anecdote)}>vote</button>
        </div>
      </div>
    }
    )}
  </div>
}

export default AnecdoteList