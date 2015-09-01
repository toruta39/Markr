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
      lastX: e.pageX,
      lastY: e.pageY
    });
  }

  onMouseMove(e) {
    if (this.state.isDragging) {
      e.preventDefault();

      this.props.onUpdateXY({
        x: this.props.x + e.pageX - this.state.lastX,
        y: this.props.y + e.pageY - this.state.lastY,
      });

      this.setState({
        lastX: e.pageX,
        lastY: e.pageY
      });
    }
  }

  onMouseUp(e) {
    if (this.state.isDragging) {
      this.setState({ isDragging: false });
    }
  }

  render() {
    return (
      <div className="viewer__viewport viewer__viewport--mover">
        {this.props.children}
      </div>
    );
  }
}

Mover.propTypes = {
  src: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  onUpdateXY: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
