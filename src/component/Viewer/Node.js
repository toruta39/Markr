import './Node.scss';
import React, { Component, PropTypes } from 'react';

export default class Node extends Component {
  render() {
    return (
      <div className="viewer__node"
        style={{
          top: `${this.props.top - 1}px`,
          left: `${this.props.left - 1}px`,
          width: `${this.props.width}px`,
          height: `${this.props.height}px`,
        }} />
    );
  }
}

Node.propTypes = {
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
