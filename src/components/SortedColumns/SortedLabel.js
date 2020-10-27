import React from 'react';

const SortedLabel = (props) => {
  const {
    column,
    sortedColumns,
    setSortedColumns
  } = props;

  const handlerChange = ({target}) => {
    // TODO handle checked state
    setSortedColumns(column, target.checked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={sortedColumns.includes(column)}
        onChange={handlerChange}
      />{column}
    </label>
  )
}

export default SortedLabel;
