import React, { useState, useEffect } from 'react';
import './table.css';

//methods
import useData from "../hooks/useTable"
import { useChangeValue } from '../hooks/useChangeValue';
import { getParseJson } from '../utils/usedPars';
import { useSort } from '../hooks/useSort';
import { createPaginationArray } from '../utils/createPaginationArray';

//components
import Pagination from './Pagination/Pagination';
import Filter from './Filter';
import Modal from './Modal/Modal';
import Portal from './Modal/Portal';
import Headers from './Head/Headers';
import UsersBody from './Body/UsersBody';
import SortedColumns from './SortedColumns/SortedColumns';
import { useCoordinate } from '../hooks/useCoordinate';

const SIZE_PAGE = 10;

const Table = (props) => {
  const { data } = props;

  const clone = getParseJson(data);
  const { 
    values: users,
    selectedId,
    isSortReversed, 
    sortBy,
    onSort, 
    onChangeBool,
    onDelete,
    onGetId,
    onChangeUser,
  } = useData(clone);
  const { coordinate, onSetCoordinate } = useCoordinate();
  const [text, setText] = useState('');
  const currentPage = useChangeValue(0);
  const sortedColumns = useSort(['name', 'surname']);
  const isEdit = useChangeValue(false);

  const columns = clone.headers.map((header) => header.propName);
  
  const filterCallback = sortedColumns.value.length 
    ? (user) => sortedColumns.value.some(
      (column) => user[column].toString().toLowerCase().includes(text.toLowerCase()))
    : (user) => user;

  const filteredUsers = users.filter(filterCallback);

  const pagination = createPaginationArray(filteredUsers, SIZE_PAGE);

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
          users={users}
          isEdit={isEdit.value}
          selectedId={selectedId}
          coordinate={coordinate}
          onIsEdit={isEdit.onChange}
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
          onIsEdit={isEdit.onChange}
          onGetId={onGetId}
          onSetCoordinate={onSetCoordinate}
        />
      </table>
    </div>
    
  )
}

export default Table;
