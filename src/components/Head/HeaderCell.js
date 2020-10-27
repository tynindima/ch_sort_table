import React from 'react';

const HeaderCell = (props) => {
  const { header, onSelect, isSorted, isSortReversed } = props;
  const { nameHeader, propName} = header;

  const handlerClick = () => {
    onSelect(header);
  };

  const arrow = isSortReversed 
    ? <span className="arrow">&uarr;</span> 
    : <span className="arrow">&darr;</span>;

  const buttons = propName !== 'change' 
    ? <button className="btn" type="button" onClick={handlerClick}>
        {nameHeader}
        {isSorted && arrow}
      </button>
    : <span>{nameHeader}</span>;

  return (
    <th className="td">
      {buttons}
    </th>
  )
}

export default HeaderCell;
