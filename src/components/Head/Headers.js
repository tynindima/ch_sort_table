import React from 'react';
import HeaderCell from './HeaderCell';

function getBool(prev, next) {
  return prev.heads === next.heads
  && prev.isSortReversed === next.isSortReversed
  && prev.sortBy === next.sortBy;
}

const Headers = React.memo((props) => {
  const { 
    heads,
    isSortReversed,
    sortBy,
    onSort 
  } = props;

  return (
    <thead>
      <tr>
        {heads.map((header, i) => (
          <HeaderCell
            key={header.propName}
            isSortReversed={isSortReversed}
            isSorted={header.propName === sortBy}
            header={header}
            onSelect={onSort}
          />
        ))}
      </tr>
    </thead>
  )
}, getBool);

export default Headers;
