import './InfoLayer.styl';
import React, { Component, PropTypes } from 'react';
import Node from './Node';

export default class InfoLayer extends Component {
  render() {
    const borderWidth = 1;

    return (
      <div className="viewer__info-layer">
        {[...this.props.nodes].reverse()
          .filter(node => node.visible)
          .map((node, index) => <Node {...node} key={index}/>)}
      </div>
    );
  }
}

InfoLayer.propTypes = {
  nodes: PropTypes.array
};
