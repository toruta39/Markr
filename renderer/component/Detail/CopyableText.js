import React from 'react';

var CopyableText = (props) => <input
  className="form-control"
  disabled={ props.value == null }
  onMouseOver={ ({ target }) => target.select() }
  onMouseOut={ ({ target }) => target.blur() }
  onChange={ (e) => e.preventDefault() }
  value={ props.value } />;

export default CopyableText;
