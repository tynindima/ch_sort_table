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

export const getReverseSort = 
(sortFunction, isReverse) => {
  
  if (isReverse) {
    return (a, b) => sortFunction(b, a);
  } else {
    return sortFunction;
  }
}

// export const creatingHighlight = (text, search) => {

//   // let split = text.toString().split(search);

//   // let ttt = '';
//   // for (let i = 0; i < split.length; i++ ) {
//   //   if (i === split.length - 1) {
//   //     ttt += split[i];
//   //   } else {
//   //     ttt += `${split[i]}<span class="highlight">${search}</span>`;
//   //   }
//   // }

//   if (text.includes(search)) {
//     const startIndex = text.indexOf(search);
//     const lastIndex = startIndex + search.length;

//     return <span>{text.slice(0, startIndex)}</span> 
//   }

//   return text;
// };
