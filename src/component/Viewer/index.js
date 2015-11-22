import './index.scss';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import DragAndDrop from './DragAndDrop';
import InfoLayer from './InfoLayer';
import Selector from './Selector';
import Zoomer from './Zoomer';

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docWidth: 0,
      docHeight: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      scale: 1,
      hoveredNode: null
    };

    this.onResize = this.onResize.bind(this);
    this.onZoomChange = this.onZoomChange.bind(this);
  }

  onZoomChange(scale) {
    this.setState({ scale: scale });
  }

  updateXY(pos) {
    this.setState(pos);
  }

  componentDidMount() {
    this.domNode = findDOMNode(this);

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
      top: this.domNode.getBoundingClientRect().top
    });

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onHover(index) {
    this.setState({ hoveredNode: ~index ? this.props.nodes[index] : null });
  }

  onResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      docWidth: nextProps.document.width,
      docHeight: nextProps.document.height
    });
  }

  getContainerStyle() {
    return {
      transform: `translate(${this.state.x}px, ${this.state.y}px) ` +
        `scale(${this.state.scale})`
    };
  }

  render() {
    return (
      <div className="pane viewer">
        <DragAndDrop onDrop={this.props.onDrop}>
          <Zoomer scale={ this.state.scale } min={0.05} max={3}
            onZoomChange={ this.onZoomChange }>
            <Selector
              nodes={this.props.nodes}
              viewport={{
                top: this.state.top,
                x: this.state.x,
                y: this.state.y,
                docWidth: this.state.docWidth,
                docHeight: this.state.docHeight,
                scale: this.state.scale
              }}
              onUpdateXY={(pos) => this.updateXY(pos)}
              onSelect={this.props.onSelect}
              onHover={(index) => this.onHover(index)}>
              <div className="viewer__container" style={this.getContainerStyle()}>
                {this.props.src && <img className="viewer__preview-layer" src={this.props.src} />}
              </div>
              <InfoLayer
                selectedNode={this.props.selectedNode}
                hoveredNode={this.state.hoveredNode}
                viewport={{
                  top: this.state.top,
                  x: this.state.x,
                  y: this.state.y,
                  width: this.state.width,
                  height: this.state.height,
                  scale: this.state.scale
                }} />
            </Selector>
          </Zoomer>
        </DragAndDrop>
      </div>
    );
  }
}

Viewer.propTypes = {
  src: PropTypes.string,
  nodes: PropTypes.array,
  selectedNode: PropTypes.object,
  document: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  onDrop: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};
