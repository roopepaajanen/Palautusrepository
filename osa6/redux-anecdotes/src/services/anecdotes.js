import axios from "axios"
axios.defaults.baseURL = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get("/")
  return response.data;
}

const createNew = async (anecdote) => {
  const object = {
    content: anecdote,
    votes: 0
  }

  const response = await axios.post("/", object);
  return response.data;
}

const vote = async (id) => {
  const existingAnecdote = (await axios.get(`/${id}`)).data
  if (existingAnecdote) {
    const votedAnecdote = { ...existingAnecdote, votes: existingAnecdote.votes + 1 };
    axios.put(`/${id}`, votedAnecdote)
    return votedAnecdote;
  }

  return existingAnecdote;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, createNew, vote
}