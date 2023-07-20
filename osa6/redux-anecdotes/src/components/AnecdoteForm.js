import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const onCreateAnecdote = event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value;
    props.createNewAnecdote(anecdote)
    props.setNotification(`You created anecdote "${anecdote}"`, 10)
  }
  
  return <div>
    <h2>Create new</h2>
    <form onSubmit={onCreateAnecdote}>
      <div><input name="anecdote" /></div>
      <button>Create</button>
    </form>
  </div>
}

const mapDispatchToProps = {
  createNewAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm