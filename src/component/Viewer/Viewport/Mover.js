import React, { Component, PropTypes, findDOMNode } from 'react';
import isChildDOMOf from '../../../util/isChildDOMOf';

export default class Mover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      lastX: 0,
      lastY: 0
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
    if (!isChildDOMOf(e.target, this.domNode)) return;

    e.preventDefault();
    this.setState({
      isDragging: true,
      lastX: e.x,
      lastY: e.y
    });
  }

  onMouseMove(e) {
    if (!isChildDOMOf(e.target, this.domNode)) return;

    e.preventDefault();
    if (this.state.isDragging) {

      this.props.onUpdateXY({
        x: this.props.x + e.x - this.state.lastX,
        y: this.props.y + e.y - this.state.lastY,
      });

      this.setState({
        lastX: e.x,
        lastY: e.y
      });
    }
  }

  onMouseUp(e) {
    if (!isChildDOMOf(e.target, this.domNode)) return;

    e.preventDefault();
    if (this.state.isDragging) {
      this.setState({ isDragging: false });
    }
  }

  getContainerStyle() {
    return {
      transform: `translate(${this.props.x}px, ${this.props.y}px) ` +
        `scale(${this.props.scale})`
    };
  }

  render() {
    return (
      <div className="viewer__viewport viewer__viewport--mover">
        <div className="viewer__container" style={this.getContainerStyle()}>
          {this.props.src && <img className="viewer__preview-layer" src={this.props.src} />}
        </div>
      </div>
    );
  }
}

Mover.propTypes = {
  src: PropTypes.string,
  scale: PropTypes.number.isRequired,
  onUpdateXY: PropTypes.func.isRequired
};
