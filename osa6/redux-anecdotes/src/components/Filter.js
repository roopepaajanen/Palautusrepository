import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/anecdoteReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterText = event.target.value;
    dispatch(setFilter(filterText)); 
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
