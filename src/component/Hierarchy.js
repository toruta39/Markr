import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Node from './Node';

export default class Hierarchy extends Component {
  render() {
    return (
      <ul>
        {this.props.nodes.map((node, index) =>
          <Node
            {...node}
            key = {index}
            onClick={() => this.props.onNodeClick(index)} />
        )}
      </ul>
    );
  }
}

Hierarchy.propTypes = {
  onNodeClick: PropTypes.func.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
  }).isRequired).isRequired
};
