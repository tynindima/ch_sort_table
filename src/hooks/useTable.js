import { useCallback, useState } from "react";

import { getSortFunction, getReverseSort } from '../utils/usedSortFunc';

const useData = ({users}) => {
  const [values, setValue] = useState(users);
  const [sortBy, setSortBy] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [isSortReversed, setIsSortReversed] = useState(false);
  
  const handlerSort = useCallback((header) => {
    
    const sortFunction = getReverseSort(getSortFunction(header), isSortReversed);
  
    setValue(prev => prev.sort(sortFunction));

    setSortBy(header.propName);
    setIsSortReversed(prev => !prev);
  }, [isSortReversed]);

  const handlerBooleanChange = useCallback((id, name) => {
    setValue(prev => prev.map(user => {
      if (user.id === id) {
        return {
          ...user,
          [name]: !user[name]
        };
      }
      return user;
    }));
  }, []);

  const handlerDelete = useCallback((id) => {
    const indexDeletedElement = values.findIndex(el => el.id === id); 
    values.splice(indexDeletedElement, 1);
    setValue(values);
  }, [values]);

  const handlerChangeString = useCallback((userData) => {
    setValue(prev => prev.map(user => {
      if (user.id === selectedId) {
        return {
          ...user,
          ...userData
        };
      }
      
      return user;
    }))
  }, [selectedId]);

  return {
    values,
    selectedId,
    isSortReversed,
    sortBy,
    onSort: handlerSort,
    onChangeBool: handlerBooleanChange,
    onDelete: handlerDelete,
    onGetId: setSelectedId,
    onChangeUser: handlerChangeString,
  };
};

export default useData;
