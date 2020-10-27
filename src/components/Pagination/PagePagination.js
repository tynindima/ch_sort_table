import React from 'react';

const PagePagination = (props) => {
  const { page, onChange, currentPage } = props;

  const handlerChosePage = () => {
    onChange(page);
  };

  const style = page === currentPage
    ? 'page currentPage'
    : 'page';

  return (
    <div 
      className={style}
      onClick={handlerChosePage}
    >
      {page + 1}
    </div>
  )
}

export default PagePagination;
