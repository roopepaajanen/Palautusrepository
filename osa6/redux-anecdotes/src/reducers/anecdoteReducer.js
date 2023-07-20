import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { setNotification, clearNotification } from './notificationReducer';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = {
  anecdotes: anecdotesAtStart.map((anecdote) => ({
    content: anecdote,
    id: getId(),
    votes: 0,
  })),
  filter: '',
};

export const addAnecdoteAsync = createAsyncThunk(
  'anecdotes/addAnecdoteAsync',
  async (content) => {
    return {
      content,
      id: getId(),
      votes: 0,
    };
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload;
      const anecdote = state.anecdotes.find((anecdote) => anecdote.id === id);
      if (anecdote) {
        const updatedAnecdotes = state.anecdotes.map((item) =>
          item.id === id ? { ...item, votes: item.votes + 1 } : item
        );
        state.anecdotes = updatedAnecdotes;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      console.log('state.filter', state.filter)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAnecdoteAsync.fulfilled, (state, action) => {
      state.anecdotes.push(action.payload);
    });
  },
});

export const { voteAnecdote, setFilter } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
