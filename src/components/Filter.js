import React from 'react';

const Filter = (props) => {
  const { onFilter, text } = props;
  
  const handlerChange = ({ target }) => {
    onFilter(target.value);
  };

  return (
    <input 
      type="text"
      value={text}
      onChange={handlerChange}
    />
  )
}

export default Filter;
