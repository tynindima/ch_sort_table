import { useState, useCallback } from 'react'

export const useSort = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerChange = useCallback((column) => {
    const isSort = value.includes(column);
    isSort
      ? setValue(prev => prev.filter(sc => sc !== column))
      : setValue(prev => [...prev, column]);
  }, [value]);

  return {
    value,
    onChange: handlerChange
  }
}
