import React from 'react';
import PagePagination from './PagePagination'

const Pagination = (props) => {
  const { pages, onChange, currentPage } = props;

  return (
    <div className="paginations">
      {pages.map(page => (
        <PagePagination
          key={page}
          page={page}
          onChange={onChange}
          currentPage={currentPage}
        />
      ))}
    </div>
  )
};

export default Pagination;
