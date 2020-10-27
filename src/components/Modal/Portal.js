import React, { useEffect, useState, useMemo } from 'react';
import './portal.css';

function areEqual(prev, next) {
  return prev.isEdit === next.isEdit
   && prev.selectedId === next.selectedId
   && prev.coordinate === next.coordinate;
}

const Portal = React.memo((props) => {
  const { 
    users,
    isEdit, 
    selectedId,
    coordinate,
    onGetId,
    onIsEdit,
    onChangeUser,
  } = props;

  const user = users.find(user => user.id === selectedId);

  const initFormData = useMemo(() => {
    return Object.keys(users[0]).map(item => ({[item]: '', propName: item}))
  }, []);

  const [formUsers, setFormUsers] = useState(initFormData);
  
  const handlerChange = (e) => {
    const { value, name } = e.target;

    setFormUsers(prev => prev.map((user) => {
      if (user.propName === name) {
        return {
          ...user,
          [name]: value
        }
      }
      
      return user;
    }));
  };

  const toClearAllStates = () => {
    setFormUsers(prev => prev.map((user) => {
      return {
        ...user,
        [user.propName]: ''
      };
    }));
  };

  const handlerClose = () => {
    onIsEdit(false);
    onGetId(0);
    toClearAllStates();
  };

  useEffect(() => {
    onIsEdit(false);

    if (selectedId) {
      setFormUsers(prev => prev.map(item => {
        return {
          ...item,
          [item.propName]: user[item.propName]
        }
      }))
    }
    
  }, [selectedId]);

  const handlerSubmit = (e) => {
    e.preventDefault();

    const newUserDate = formUsers.reduce((acc, item) => {
      return {
        ...acc,
        [item.propName]: item[item.propName]
      };
    }, {});

    onChangeUser(newUserDate);
    onIsEdit(false);
    onGetId(0);
    toClearAllStates();
  }

  return isEdit
    && <div className="container" style={{left: coordinate.x - 300, top: coordinate.y}}>
      <h2 className="portal-title">Editing user</h2>
      <form onSubmit={handlerSubmit}>
        {formUsers.map((item => (
          <div key={item.propName} className="input-box">
            <label className="portal-label" htmlFor="name">{item.propName} : </label>
            <input
              className="portal-input"
              type="text"
              name={item.propName}
              autoComplete="off"
              value={item[item.propName]}
              onChange={handlerChange}
            />
          </div>
        )))}
        <div className="box-button">
          <button type="submit">Apply</button>
          <button onClick={handlerClose} type="button">Cancel</button>
        </div>
      </form>
    </div>
}, areEqual);

export default Portal;
