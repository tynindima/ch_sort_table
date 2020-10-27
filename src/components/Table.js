import React, { useState, useEffect } from 'react';
import './table.css';

//methods
import useData from "../hooks/useTable"
import { useChangeValue } from '../hooks/useChangeValue';
import { getParseJson } from '../utils/usedPars';
import { useSort } from '../hooks/useSort';

//components
import Pagination from './Pagination/Pagination';
import Filter from './Filter';
import Modal from './Modal/Modal';
import Portal from './Modal/Portal';
import Headers from './Head/Headers';
import UsersBody from './Body/UsersBody';
import SortedColumns from './SortedColumns/SortedColumns';

const SIZE_PAGE = 10;

const Table = (props) => {
  const { data } = props;

  const clone = getParseJson(data);
  const { 
    values: users,
    selectedId,
    isSortReversed, 
    sortBy,
    isEdit,
    coordinate,
    onSort, 
    onChangeBool,
    onDelete,
    onIsEdit,
    onGetId,
    onChangeUser,
    onSetCoordinate
  } = useData(clone);
  const [text, setText] = useState('');
  const currentPage = useChangeValue(0);
  const sortedColumns = useSort(['name', 'surname']);

  const columns = clone.headers.map((header) => header.propName);

  const filteredUsers = users.filter(
    (user) => sortedColumns.value.some(
      (column) => user[column].toString().toLowerCase().includes(text.toLowerCase()))
  );

  const pagination = Array.from({ length: Math.ceil(filteredUsers.length / SIZE_PAGE) }, (_, i) => i);

  console.log('table');

  useEffect(() => {
    if (pagination.length <= currentPage.value) {
      currentPage.onChange(Math.max(0, pagination.length - 1));
    } 
  }, [pagination]);

  const visibleUsers = filteredUsers.slice(currentPage.value * 10, currentPage.value * 10 + 10);
  
  return (
    <div className="table-container">
      <Modal>
        <Portal
          isEdit={isEdit}
          selectedId={selectedId}
          coordinate={coordinate}
          onIsEdit={onIsEdit}
          onChangeUser={onChangeUser}
          onGetId={onGetId}
        />
      </Modal>
      <Filter onFilter={setText} text={text}/>
      <SortedColumns 
        columns={columns}
        sortedColumns={sortedColumns.value}
        setSortedColumns={sortedColumns.onChange}
      />
      <Pagination 
        pages={pagination}
        currentPage={currentPage.value}
        onChange={currentPage.onChange}
      />
      <table className="table">
        <Headers 
          heads={clone.headers}
          isSortReversed={isSortReversed}
          sortBy={sortBy}
          onSort={onSort}
        />
        <UsersBody
          users={visibleUsers}
          text={text}
          selectedId={selectedId}
          onChangeBool={onChangeBool}
          onDelete={onDelete}
          onIsEdit={onIsEdit}
          onGetId={onGetId}
          onSetCoordinate={onSetCoordinate}
        />
      </table>
    </div>
    
  )
}

export default Table;
