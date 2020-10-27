import React from 'react';
import Row from './Row';

const UsersBody = (props) => {
  const { 
    users,
    selectedId,
    text,
    onChangeBool,
    onDelete,
    onIsEdit,
    onGetId,
    onSetCoordinate
  } = props;

  return (
    <tbody>
      {users.map((user) => (
        <Row
          key={user.id}
          user={user}
          text={text}
          selectedId={selectedId}
          isChange={user.id === selectedId}
          onChangeBool={onChangeBool}
          onDelete={onDelete}
          onIsEdit={onIsEdit}
          onGetId={onGetId}
          onSetCoordinate={onSetCoordinate}
        />
      ))}
    </tbody>
  )
}

export default UsersBody;
