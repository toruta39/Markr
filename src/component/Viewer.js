import React, { Component, PropTypes, findDOMNode } from 'react';
import isChildDOMOf from '../util/isChildDOMOf';

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0
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
      transform: `translate(${this.state.x}px, ${this.state.y}px)`
    };
  }

  render() {
    return (
      <div className="viewport">
        <div className="container" style={this.getContainerStyle()}>
          {this.props.src ? <img src={this.props.src} /> : null}
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  src: PropTypes.string
};
