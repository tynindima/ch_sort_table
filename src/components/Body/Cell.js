import React from 'react';

import Hightlight from '../../utils/Hightlight';

const Cell = (props) => {
  const { name, onChange, text } = props;

  return typeof name === 'boolean'
    ? <td className="td">
        <input 
        type="checkbox" 
        checked={name}
        onChange={onChange}
        />
      </td>
    : <td className="td">
      <Hightlight
        name={name}
        search={text}
      />
    </td> 
;
  
}

export default Cell;
