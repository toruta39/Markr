import React, { Component, PropTypes, findDOMNode } from 'react';
import isChildDOMOf from '../../util/isChildDOMOf';
import Node from '../Node';

export default class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      isMouseDown: false,
      lastX: 0,
      lastY: 0,
      menuX: 0,
      menuY: 0,
      psdX: 0,
      psdY: 0,
      showCandidateNodes: false,
      candidateNodeIndices: []
    };

    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    this.depthMap = null;

    document.body.appendChild(this._canvas);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  updateDepthMap() {
    const nodes = this.props.nodes;
    const drawn = new Set();

    if (!nodes.length) return;

    const canvas = this._canvas;
    const ctx = this._ctx;

    canvas.width = this.props.viewport.docWidth;
    canvas.height = this.props.viewport.docHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function isVisible(node) {
      if (!node.visible) return false;

      let result = true;

      node.parents.forEach((parent) => {
        if (!nodes[parent].visible) {
          result = false;
        }
      });

      return result;
    }

    function fill(node, i) {
      if (drawn.has(i)) return;

      if (node.parents.length) {
        let parentIndex = node.parents[node.parents.length - 1];
        fill(nodes[parentIndex], parentIndex);
      }

      if (isVisible(node) && node.type === 'layer') {
        ctx.fillStyle = '#' + ('00000' + i.toString(16)).slice(-6);
        ctx.fillRect(node.left, node.top, node.width, node.height);
      }

      drawn.add(i);
    }

    for (let i = nodes.length - 1; i >= 0; --i) {
      fill(nodes[i], i);
    }

    this.depthMap = ctx.getImageData(
      0, 0, canvas.width, canvas.height).data;
  }

  getDepthByPoint(psdX, psdY) {
    if (psdX < 0 || psdX > this.props.viewport.docWidth - 1 ||
        psdY < 0 || psdY > this.props.viewport.docHeight - 1) {
      return -1;
    }

    const i = (psdY * this.props.viewport.docWidth + psdX) * 4;
    return parseInt(this.depthMap[i].toString(16) +
      this.depthMap[i+1].toString(16) +
      this.depthMap[i+2].toString(16), 16);
  }

  // return indices of all nodes that hit
  getAllHoveredNodesIndices() {
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

    return this.getAllHoveredNodesIndices().filter((index) => {
      return nodes[index].visible;
    });
  }

  componentDidMount() {
    this.updateDepthMap();

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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.nodes !== prevProps.nodes) {
      this.updateDepthMap();
    }
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
      lastY: e.pageY,
      showCandidateNodes: false
    });
  }

  onMouseMove(e) {
    if (this.state.isMouseDown) {
      e.preventDefault();

      this.props.onUpdateXY({
        x: this.props.viewport.x + e.pageX - this.state.lastX,
        y: this.props.viewport.y + e.pageY - this.state.lastY,
      });

      this.setState({
        isDragging: (() => {
          let dx = e.pageX - this.state.startX,
            dy = e.pageY - this.state.startY;
          return dx * dx + dy * dy > 25;
        })(),
        lastX: e.pageX,
        lastY: e.pageY
      });
    }

    if (!isChildDOMOf(e.target, this.domNode)) return;

    // map mouse position to psd coord
    let [ psdX, psdY ] = [
      (e.pageX - this.props.viewport.x) / this.props.viewport.scale | 0,
      (e.pageY - this.props.viewport.y) / this.props.viewport.scale | 0
    ];

    this.setState({ psdX, psdY });
    this.props.onHover(this.getDepthByPoint(psdX, psdY));
  }

  onMouseUp(e) {
    if (this.state.isMouseDown) {
      if (!this.state.isDragging) {
        if (e.button === 0) {
          this.props.onSelect(this.getDepthByPoint(this.state.psdX, this.state.psdY));
        }

        if (e.button === 2) {
          this.setState({
            menuX: e.pageX,
            menuY: e.pageY,
            showCandidateNodes: true,
            candidateNodeIndices: this.getVisibleHoveredNodesIndices()
          });
        }
      }

      this.setState({ isMouseDown: false, isDragging: false });
    }
  }

  render() {
    return (
      <div className="viewer__viewport viewer__viewport--selector">
        {this.props.children}
        {
          this.state.showCandidateNodes && (
            <ul
              onMouseDown={e => e.stopPropagation()}
              onMouseMove={e => e.stopPropagation()}
              onMouseUp={e => e.stopPropagation()}
              style={{
                position: 'absolute',
                left: this.state.menuX,
                top: this.state.menuY
              }}>
              {
                this.state.candidateNodeIndices
                .map(index => {
                  const node = this.props.nodes[index];
                  return (
                    <Node
                      {...node}
                      key={index}
                      onClick={e => {
                        this.setState({ showCandidateNodes: false });
                        this.props.onSelect(index)
                      }} />
                  );
                })
              }
            </ul>
          )
        }
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
  viewport: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    docWidth: PropTypes.number.isRequired,
    docHeight: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
  }).isRequired,
  onUpdateXY: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
