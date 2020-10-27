import React from 'react';

import SortedLabel from './SortedLabel';

const areEqual = (prev, next) => {
  return prev.sortedColumns.length === next.sortedColumns.length;
};

const SortedColumns = React.memo((props) => {
  const { 
    columns,
    sortedColumns,
    setSortedColumns
  } = props;

  return columns.map((column) => (
    <SortedLabel
      key={column}
      column={column}
      sortedColumns={sortedColumns}
      setSortedColumns={setSortedColumns}
    />
  ));
}, areEqual);

export default SortedColumns;
