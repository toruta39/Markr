import './NodeInfo.scss';
import React, { Component, PropTypes } from 'react';

export default class NodeInfo extends Component {
  render() {
    return (
      <div className="node-info"
        style={{
          top: `${this.props.top * this.props.scale - 1}px`,
          left: `${this.props.left * this.props.scale - 1}px`,
          width: `${this.props.width * this.props.scale}px`,
          height: `${this.props.height * this.props.scale}px`,
        }}>
        <div className="node-info__top-border"></div>
        <div className="node-info__left-border"></div>
        <div className="node-info__right-border"></div>
        <div className="node-info__bottom-border"></div>
        <div className="node-info__width">
          <span className="node-info__width-label">{`${this.props.width}px`}</span>
        </div>
        <div className="node-info__height">
          <span className="node-info__height-label">{`${this.props.height}px`}</span>
        </div>
      </div>
    );
  }
}

NodeInfo.propTypes = {
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired
};
