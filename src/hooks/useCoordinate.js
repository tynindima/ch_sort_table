import { useState, useCallback } from 'react';

export const useCoordinate = () => {
  const [value, setvalue] = useState({ x: null, y: null });

  const handlerSetCoordinate = useCallback((x, y) => {
    setvalue({ x, y });
  }, []);

  return {
    coordinate: value,
    onSetCoordinate: handlerSetCoordinate
  }
}
