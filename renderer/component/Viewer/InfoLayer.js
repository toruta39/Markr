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
    const node = this.props.hoveredNode || this.props.selectedNode,
      referenceNode = node === this.props.selectedNode ? null : this.props.selectedNode;

    return (
      <div className="viewer__info-layer" style={this.getContainerStyle()}>
        {
          node && <NodeInfo
            node={node}
            referenceNode={referenceNode}
            viewport={this.props.viewport}/>
        }
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
