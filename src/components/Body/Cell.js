import React from 'react';

import Hightlight from '../../utils/Hightlight';

const Cell = (props) => {
  const { name, onChange, text, propName } = props;

  return <td className="td">
      {typeof name === 'boolean' ? <input
        type="checkbox"
        checked={name}
        name={propName}
        onChange={onChange}
      />
      :
      <Hightlight
        name={name}
        search={text}
      />
      }
    </td> 
;
  
}

export default Cell;
