import React, { useEffect } from 'react';
import './portal.css';

import { useChangeValue } from '../../hooks/useChangeValue';

function areEqual(prev, next) {
  return prev.isEdit === next.isEdit
   && prev.selectedId === next.selectedId
   && prev.coordinate === next.coordinate;
}

const Portal = React.memo((props) => {
  const { 
    isEdit, 
    selectedId,
    coordinate,
    onGetId,
    onIsEdit,
    onChangeUser,
  } = props;
  const name = useChangeValue('');
  const surname = useChangeValue('');
  const age = useChangeValue('');

  const toClearAllStates = () => {
    name.onChange('');
    surname.onChange('');
    age.onChange('');
  };

  const handlerClose = () => {
    onIsEdit(false);
    onGetId(0);
    toClearAllStates();
  };

  useEffect(() => {
    onIsEdit(false);
  }, [selectedId]);

  const handlerSubmit = (e) => {
    e.preventDefault();

    const newUserDate = {
      name: name.value, 
      surname: surname.value, 
      age: age.value
    };

    onChangeUser(newUserDate);
    onIsEdit(false);
    onGetId(0);
    toClearAllStates();
  }

  return isEdit
    ? <div className="container" style={{left: coordinate.x - 300, top: coordinate.y}}>
      <h2 className="portal-title">Editing user</h2>
      <form onSubmit={handlerSubmit} >
        <div className="input-box">
          <label className="portal-label" htmlFor="name">Name : </label>
          <input 
            className="portal-input" 
            type="text" 
            name="name" 
            autoComplete="off"
            value={name.value}
            onChange={(e) => name.onChange(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label className="portal-label" htmlFor="surname">Surame : </label>
          <input 
            className="portal-input" 
            type="text" 
            name="surname" 
            autoComplete="off"
            value={surname.value}
            onChange={(e) => surname.onChange(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label className="portal-label" htmlFor="age">Age : </label>
          <input 
            className="portal-input"
            type="text"
            name="age"
            autoComplete="off"
            value={age.value}
            onChange={(e) => age.onChange(e.target.value, e.target.name)}
          />
        </div>

        <div className="box-button">
          <button type="submit">Edit</button>
          <button onClick={handlerClose} type="button">Cansel</button>
        </div>
      </form>
    </div>
    : null;
}, areEqual);

export default Portal;
