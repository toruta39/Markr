import './InfoLayer.scss';
import React, { Component, PropTypes } from 'react';
import NodeInfo from './NodeInfo';

export default class InfoLayer extends Component {
  getContainerStyle() {
    return {
      left: this.props.viewport.x,
      top: this.props.viewport.y
    };
  }

  render() {
    return (
      <div className="viewer__info-layer" style={this.getContainerStyle()}>
        { this.props.selectedNode &&
          <NodeInfo node={this.props.selectedNode}
            viewport={this.props.viewport} /> }
        { this.props.hoveredNode &&
          <NodeInfo node={this.props.hoveredNode}
            viewport={this.props.viewport}/> }
      </div>
    );
  }
}

InfoLayer.propTypes = {
  selectedNode: PropTypes.object,
  hoveredNode: PropTypes.object,
  viewport: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired
};
