import React from 'react';

var CopyableTextarea = (props) => <textarea
  className="form-control"
  rows={ props.rows || 3 }
  disabled={ props.value == null }
  onMouseOver={ ({ target }) => target.select() }
  onMouseOut={ ({ target }) => target.blur() }
  onChange={ (e) => e.preventDefault() }
  value={ props.value } />;

export default CopyableTextarea;
