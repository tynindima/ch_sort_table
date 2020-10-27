export const getSortFunction = (header) => {
  switch (header.propType) {
    case 'string':
      return (a, b) => a[header.propName].localeCompare(b[header.propName]);
    case 'number':
      return (a, b) => a[header.propName] - b[header.propName];
    default:
      break;
  }
}

export const getReverseSort = (sortFunction, isReverse) => {
  if (isReverse) {
    return (a, b) => sortFunction(b, a);
  } else {
    return sortFunction;
  }
}
