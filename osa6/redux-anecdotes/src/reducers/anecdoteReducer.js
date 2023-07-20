import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const vote = id => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type: "VOTE",
      data: { id }
    })
  }
}

export const createNewAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: { anecdote: newAnecdote }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: { anecdotes }
    })
  }
}

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id
      const anecdote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      const otherAnecdotes = state.filter(anecdote => anecdote.id !== id)
      return [...otherAnecdotes, votedAnecdote]
    case "NEW_ANECDOTE":
      const text = action.data.anecdote.content;
      return [...state, asObject(text)]
    case "INIT_ANECDOTES":
      return action.data.anecdotes
    default:
      break;
  }

  return state
}

export default anecdoteReducer