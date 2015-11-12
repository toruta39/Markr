import './NodeInfo.scss';
import React, { Component, PropTypes } from 'react';

export default class NodeInfo extends Component {
  render() {
    const { node, referenceNode } = this.props;

    if (referenceNode) {
      return <div>
        <div className="node-info"
          style={{
            top: `${referenceNode.top * this.props.viewport.scale - 1}px`,
            left: `${referenceNode.left * this.props.viewport.scale - 1}px`,
            width: `${referenceNode.width * this.props.viewport.scale}px`,
            height: `${referenceNode.height * this.props.viewport.scale}px`,
          }}>
          <div className="node-info__top-border" style={{
            left: `${-this.props.viewport.x - (referenceNode.left * this.props.viewport.scale - 1)}px`,
            width: `${this.props.viewport.width}px`
          }}></div>
          <div className="node-info__left-border" style={{
            top: `${-this.props.viewport.y - (referenceNode.top * this.props.viewport.scale - 1)}px`,
            height: `${this.props.viewport.height}px`
          }}></div>
          <div className="node-info__right-border"style={{
            top: `${-this.props.viewport.y - (referenceNode.top * this.props.viewport.scale - 1)}px`,
            height: `${this.props.viewport.height}px`
          }}></div>
          <div className="node-info__bottom-border" style={{
            left: `${-this.props.viewport.x - (referenceNode.left * this.props.viewport.scale - 1)}px`,
            width: `${this.props.viewport.width}px`
          }}></div>
        </div>
        <div className="node-info"
          style={{
            top: `${node.top * this.props.viewport.scale - 1}px`,
            left: `${node.left * this.props.viewport.scale - 1}px`,
            width: `${node.width * this.props.viewport.scale}px`,
            height: `${node.height * this.props.viewport.scale}px`,
          }}>
          {
            node.left + node.width <= referenceNode.left ?
              <div className="node-info__right-offset"
                style={{
                  width: `${referenceNode.left - node.left - node.width}px`
                }}>
                <span className="node-info__right-label">{`${referenceNode.left - node.left - node.width}px`}</span>
              </div>
            : node.left <= referenceNode.left ?
              <div className="node-info__right-offset"
                style={{
                  width: `${referenceNode.left - node.left}px`,
                  left: '0px'
                }}>
                <span className="node-info__right-label">{`${referenceNode.left - node.left}px`}</span>
              </div>
            : node.left <= referenceNode.left + referenceNode.width ?
              <div className="node-info__left-offset"
                style={{
                  width: `${node.left - referenceNode.left}px`
                }}>
                <span className="node-info__left-label">{`${node.left - referenceNode.left}px`}</span>
              </div>
            :
              <div className="node-info__left-offset"
                style={{
                  width: `${node.left - referenceNode.left - referenceNode.width}px`
                }}>
                <span className="node-info__left-label">{`${node.left - referenceNode.left - referenceNode.width}px`}</span>
              </div>
          }
          {
            node.top + node.height <= referenceNode.top ?
              <div className="node-info__bottom-offset"
                style={{
                  height: `${referenceNode.top - node.top - node.height}px`
                }}>
                <span className="node-info__bottom-label">{`${referenceNode.top - node.top - node.height}px`}</span>
              </div>
            : node.top <= referenceNode.top ?
              <div className="node-info__top-offset"
                style={{
                  height: `${referenceNode.top - node.top}px`,
                  top: '0px'
                }}>
                <span className="node-info__top-label">{`${referenceNode.top - node.top}px`}</span>
              </div>
            : node.top <= referenceNode.top + referenceNode.height ?
              <div className="node-info__top-offset"
                style={{
                  height: `${node.top - referenceNode.top}px`
                }}>
                <span className="node-info__bottom-label">{`${node.top - referenceNode.top}px`}</span>
              </div>
            :
              <div className="node-info__top-offset"
                style={{
                  height: `${node.top - referenceNode.top - referenceNode.height}px`
                }}>
                <span className="node-info__top-label">{`${node.top - referenceNode.top - referenceNode.height}px`}</span>
              </div>
          }
        </div>
      </div>;
    } else {
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
  referenceNode: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  viewport: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
  }).isRequired
};
