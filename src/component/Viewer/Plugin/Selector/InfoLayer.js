import './InfoLayer.scss';
import React, { Component, PropTypes } from 'react';
import Node from './Node';

export default class InfoLayer extends Component {
  getContainerStyle() {
    return {
      transform: `translate(${this.props.x}px, ${this.props.y}px) ` +
        `scale(${this.props.scale})`
    };
  }

  render() {
    return (
      <div className="viewer__info-layer" style={this.getContainerStyle()}>
        { this.props.selectedNode ? <Node {...this.props.selectedNode} /> : null }
      </div>
    );
  }
}

InfoLayer.propTypes = {
  nodes: PropTypes.array,
  selectedNode: PropTypes.object,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  docWidth: PropTypes.number.isRequired,
  docHeight: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired
};
