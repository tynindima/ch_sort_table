import React from 'react';

import Cell from './Cell';

function areEqual(prev, next) {
  return prev.user === next.user
  && prev.isChange === next.isChange
  && prev.text === next.text;
}

const Row = React.memo((props) => {
  const { 
    user, 
    selectedId,
    text,
    isChange,
    onChangeBool, 
    onDelete,
    onIsEdit,
    onGetId,
    onSetCoordinate
  } = props;

  const handlerTaggler = () => {
    if (selectedId === user.id) {
      onGetId(0);
    }
    onGetId(user.id);
  };

  const handlerClose = () => {
    onGetId(0);
  };

  const handlerChange = ({ target }) => {
    onChangeBool(user.id, target.name);
  };

  const handlerDelete = () => {
    onDelete(user.id);
  };

  const handlerOnIsEdit = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    onSetCoordinate(x, y);
    onIsEdit(true);
    onGetId(user.id);
  }

  const change = isChange 
    ? <div>
      <button onClick={handlerOnIsEdit}>Edit</button>
      <button onClick={handlerDelete}>Delete</button>
      <button onClick={handlerClose}>x</button>
    </div>
    : <button onClick={handlerTaggler}>...</button>;

  const userDescription = Object.entries(user);

  return (
    <tr>
      {userDescription.map((item, i) => (
        <Cell
          key={i}
          name={item[1]}
          text={text}
          propName={item[0]}
          onChange={handlerChange}
        />
      ))}
      <td className="td td-change">
        {change}
      </td>
    </tr>
  )
}, areEqual);

export default Row;
