import { useState, useCallback } from "react";

export const useChangeValue = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerChange = useCallback((value, name) => {
    if (name === "age") {
      setValue(value.replace(/[^\d]/g, ''));
    } else {
      setValue(value);
    }
    
  }, []);

  return {
    value,
    onChange: handlerChange
  };
};
