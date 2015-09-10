import './NodeInfo.scss';
import React, { Component, PropTypes } from 'react';

export default class NodeInfo extends Component {
  render() {
    const node = this.props.node;

    return (
      <div className="node-info"
        style={{
          top: `${node.top * this.props.viewport.scale - 1}px`,
          left: `${node.left * this.props.viewport.scale - 1}px`,
          width: `${node.width * this.props.viewport.scale}px`,
          height: `${node.height * this.props.viewport.scale}px`,
        }}>
        <div className="node-info__top-border" style={{
          left: `${-this.props.viewport.x - (node.left * this.props.viewport.scale - 1)}px`,
          width: `${this.props.viewport.width}px`
        }}></div>
        <div className="node-info__left-border" style={{
          top: `${-this.props.viewport.y - (node.top * this.props.viewport.scale - 1)}px`,
          height: `${this.props.viewport.height}px`
        }}></div>
        <div className="node-info__right-border"style={{
          top: `${-this.props.viewport.y - (node.top * this.props.viewport.scale - 1)}px`,
          height: `${this.props.viewport.height}px`
        }}></div>
        <div className="node-info__bottom-border" style={{
          left: `${-this.props.viewport.x - (node.left * this.props.viewport.scale - 1)}px`,
          width: `${this.props.viewport.width}px`
        }}></div>
        <div className="node-info__width">
          <span className="node-info__width-label">{`${node.width}px`}</span>
        </div>
        <div className="node-info__height">
          <span className="node-info__height-label">{`${node.height}px`}</span>
        </div>
      </div>
    );
  }
}

NodeInfo.propTypes = {
  node: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  viewport: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
  }).isRequired
};
