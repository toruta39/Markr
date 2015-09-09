import './NodeInfo.scss';
import React, { Component, PropTypes } from 'react';

export default class NodeInfo extends Component {
  render() {
    const selectedNode = this.props.selectedNode;

    return (
      <div className="node-info"
        style={{
          top: `${selectedNode.top * this.props.scale - 1}px`,
          left: `${selectedNode.left * this.props.scale - 1}px`,
          width: `${selectedNode.width * this.props.scale}px`,
          height: `${selectedNode.height * this.props.scale}px`,
        }}>
        <div className="node-info__top-border" style={{
          left: `${-this.props.x - (selectedNode.left * this.props.scale - 1)}px`,
          width: `${this.props.width}px`
        }}></div>
        <div className="node-info__left-border" style={{
          top: `${-this.props.y - (selectedNode.top * this.props.scale - 1)}px`,
          height: `${this.props.height}px`
        }}></div>
        <div className="node-info__right-border"style={{
          top: `${-this.props.y - (selectedNode.top * this.props.scale - 1)}px`,
          height: `${this.props.height}px`
        }}></div>
        <div className="node-info__bottom-border" style={{
          left: `${-this.props.x - (selectedNode.left * this.props.scale - 1)}px`,
          width: `${this.props.width}px`
        }}></div>
        <div className="node-info__width">
          <span className="node-info__width-label">{`${selectedNode.width}px`}</span>
        </div>
        <div className="node-info__height">
          <span className="node-info__height-label">{`${selectedNode.height}px`}</span>
        </div>
      </div>
    );
  }
}

NodeInfo.propTypes = {
  selectedNode: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  docWidth: PropTypes.number.isRequired,
  docHeight: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired
};
