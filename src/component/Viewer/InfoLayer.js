import './InfoLayer.scss';
import React, { Component, PropTypes } from 'react';
import NodeInfo from './NodeInfo';

export default class InfoLayer extends Component {
  getContainerStyle() {
    return {
      left: this.props.x,
      top: this.props.y
    };
  }

  render() {
    return (
      <div className="viewer__info-layer" style={this.getContainerStyle()}>
        { this.props.selectedNode ? <NodeInfo {...this.props.selectedNode} scale={this.props.scale} /> : null }
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
