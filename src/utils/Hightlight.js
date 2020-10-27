import React from 'react';

const Hightlight = ({name, search}) => {
  const text = name.toString();
  const flexText = text.toLowerCase();
  const flexSearch = search.toLowerCase();
  if (search !== '' && flexText.includes(flexSearch)) {
    const startIndex = flexText.indexOf(flexSearch);
    const lastIndex = startIndex + search.length;

    return (
      <>{text.substring(0, startIndex)}
        <span className="highlight">{text.substring(startIndex, lastIndex)}</span>
        {text.substring(lastIndex)}
      </>)
  }

  return <>{text}</>;
}

export default Hightlight;
