import './index.scss';
import React, { Component, PropTypes, findDOMNode } from 'react';
import isChildDOMOf from '../../util/isChildDOMOf';
import DragAndDrop from './DragAndDrop';
import InfoLayer from './InfoLayer';

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      scale: 1
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    this.domNode = findDOMNode(this);

    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(e) {
    e.preventDefault();

    if (isChildDOMOf(e.target, this.domNode)) {
      this.setState({
        isDragging: true,
        lastX: e.x,
        lastY: e.y
      });
    }
  }

  onMouseMove(e) {
    e.preventDefault();
    if (this.state.isDragging) {
      this.setState({
        x: this.state.x + e.x - this.state.lastX,
        y: this.state.y + e.y - this.state.lastY,
        lastX: e.x,
        lastY: e.y
      });
    }
  }

  onMouseUp(e) {
    e.preventDefault();
    if (this.state.isDragging) {
      this.setState({ isDragging: false });
    }
  }

  getContainerStyle() {
    return {
      transform: `translate(${this.state.x}px, ${this.state.y}px) ` +
        `scale(${this.state.scale})`
    };
  }

  onZoomInClick(e) {
    e.preventDefault();
    this.setState({ scale: this.state.scale * 2 });
  }

  onZoomOutClick(e) {
    e.preventDefault();
    this.setState({ scale: this.state.scale / 2 });
  }

  render() {
    return (
      <div className="viewer">
        <DragAndDrop
          onDrop={file => this.props.onDrop(file)} >
          <div className="viewer__viewport">
            <div className="viewer__container" style={this.getContainerStyle()}>
              {this.props.nodes && <InfoLayer nodes={this.props.nodes} />}
              {this.props.src && <img className="viewer__preview-layer" src={this.props.src} />}
            </div>
          </div>
        </DragAndDrop>
        <div className="viewer__zoom">
          <button onClick={e => this.onZoomOutClick(e)}>-</button>
          {`${Math.round(this.state.scale * 100)}%`}
          <button onClick={e => this.onZoomInClick(e)}>+</button>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  src: PropTypes.string,
  nodes: PropTypes.array,
  onDrop: PropTypes.func.isRequired
};
