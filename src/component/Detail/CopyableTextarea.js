import React from 'react';

var CopyableTextarea = (props) => (
  <div>
    <textarea
      disabled={props.value == null}
      onMouseOver={({ target }) => target.select()}
      onMouseOut={({ target }) => target.blur()}
      onChange={(e) => e.preventDefault()}
      value={props.value} />
  </div>
);

export default CopyableTextarea;
