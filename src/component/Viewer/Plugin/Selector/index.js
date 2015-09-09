import React, { Component, PropTypes, findDOMNode } from 'react';
import isChildDOMOf from '../../../../util/isChildDOMOf';
import InfoLayer from './InfoLayer';

export default class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      isMouseDown: false,
      lastX: 0,
      lastY: 0,
      psdX: null,
      psdY: null
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
      isMouseDown: true,
      mouseDownTime: Date.now(),
      startX: e.pageX,
      startY: e.pageY,
      lastX: e.pageX,
      lastY: e.pageY
    });
  }

  onMouseMove(e) {
    if (this.state.isMouseDown) {
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

    if (!isChildDOMOf(e.target, this.domNode)) return;

    // map mouse position to psd coord
    this.setState({
      psdX: (e.pageX - this.props.x) / this.props.scale,
      psdY: (e.pageY - this.props.y) / this.props.scale
    });
  }

  // return indices of all nodes that hit
  getAllHoverdNodesIndices() {
    let [x, y] = [this.state.psdX, this.state.psdY];

    return this.props.nodes.reduce((acc, node, i) => {
      if (node.left < x && x < node.left + node.width &&
        node.top < y && y < node.top + node.height) {
        acc.push(i);
      }
      return acc;
    }, []);
  }

  getVisibleHoveredNodesIndices() {
    let nodes = this.props.nodes;

    return this.getAllHoverdNodesIndices().filter((index) => {
      return nodes[index].visible;
    });
  }

  // return the top hit only
  // TODO this is a little slow for realtime use, needs optimization
  getHoveredNodeIndex() {
    let nodes = this.props.nodes;

    return this.getVisibleHoveredNodesIndices().reduce((acc, index, i, indices) => {
      let node = nodes[index];
      if (node.parents.indexOf(acc) === node.parents.length - 1) return index;
      return acc;
    }, -1);
  }

  isClick(e) {
    const CLICK_DURATION = 300;
    const CLICK_MOVEMENT = 5;

    return e.pageX - this.state.startX < CLICK_MOVEMENT &&
      e.pageY - this.state.startY < CLICK_MOVEMENT ||
      Date.now() - this.state.mouseDownTime < CLICK_DURATION;
  }

  onMouseUp(e) {
    if (this.state.isMouseDown) {
      if (this.isClick(e)) {
        this.props.onSelect(this.getHoveredNodeIndex());
      }

      this.setState({ isMouseDown: false, isDragging: false });
    }
  }

  render() {
    return (
      <div className="viewer__viewport viewer__viewport--selector">
        {this.props.children}
        <InfoLayer {...this.props} />
      </div>
    );
  }
}

Selector.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired
  })).isRequired,
  selectedNode: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired
  }).isRequired,
  src: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  docWidth: PropTypes.number.isRequired,
  docHeight: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  onUpdateXY: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
