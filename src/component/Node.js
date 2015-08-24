import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Node extends Component {
  render() {
    return (
      <li
        className={classNames({
          'node': true,
          'node--selected': this.props.selected
        })}
        onClick={e =>
          this.props.onClick(e)
        }>
        <div className="node__name">
          {this.props.name}
        </div>
      </li>
    );
  }
}

Node.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
};
