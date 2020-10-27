import { useCallback, useState } from "react";

import { getSortFunction, getReverseSort } from '../utils/usedSortFunc';

const useData = ({users}) => {
  const [values, setValue] = useState(users);
  const [sortBy, setSortBy] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [coordinate, setCoordinate] = useState({ x: null, y: null });
  const [isSortReversed, setIsSortReversed] = useState(false);
  
  const handlerSort = useCallback((header) => {
    
    const sortFunction = getReverseSort(getSortFunction(header), isSortReversed);
  
    setValue(prev => prev.sort(sortFunction));

    setSortBy(header.propName);
    setIsSortReversed(prev => !prev);
  }, [isSortReversed]);

  const handlerBooleanChange = useCallback((id) => {
    setValue(prev => prev.map(user => {
      if (user.id === id) {
        return {
          ...user,
          bool: !user.bool
        };
      }
      return user;
    }));
  }, []);

  const handlerDelete = useCallback((id) => {
    const newValues = [...values];
    const indexDeletedElement = newValues.findIndex(el => el.id === id); 
    newValues.splice(indexDeletedElement, 1);
    setValue(newValues);
  }, [values]);

  const handlerTagglerEdit = useCallback((bool) => {
    setIsEdit(bool);
  }, []);

  const handlerGetId = useCallback((id) => {
    setSelectedId(id);
  }, []);

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

  const handlerSetCoordinate = useCallback((x, y) => {
    setCoordinate({x, y});
  }, []);

  return {
    values,
    selectedId,
    isSortReversed,
    sortBy,
    isEdit,
    coordinate,
    onSort: handlerSort,
    onChangeBool: handlerBooleanChange,
    onDelete: handlerDelete,
    onIsEdit: handlerTagglerEdit,
    onGetId: handlerGetId,
    onChangeUser: handlerChangeString,
    onSetCoordinate: handlerSetCoordinate
  };
};

export default useData
