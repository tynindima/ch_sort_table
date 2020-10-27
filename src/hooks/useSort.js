import { useState, useCallback } from 'react'

export const useSort = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerChange = useCallback((column) => {
    const isSort = value.includes(column);
    const sortCallback = isSort
      ? prev => prev.filter(sc => sc !== column)
      : prev => [...prev, column];
    setValue(sortCallback);
  }, [value]);

  return {
    value,
    onChange: handlerChange
  }
}
