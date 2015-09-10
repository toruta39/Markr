import './index.scss';
import React, { Component, PropTypes } from 'react';
import DragAndDrop from './DragAndDrop';
import InfoLayer from './InfoLayer';
import Selector from './Plugin/Selector';

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
  }

  onZoomChange(e) {
    this.setState({ scale: +e.target.value });
  }

  updateXY(pos) {
    this.setState(pos);
  }

  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0
    });

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onHover(index) {
    ~index && this.setState({ hoveredNode: this.props.nodes[index] });
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
      <div className="viewer">
        <DragAndDrop
          onDrop={this.props.onDrop} >
          <Selector
            {...this.state}
            nodes={this.props.nodes}
            selectedNode={this.props.selectedNode}
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
                x: this.state.x,
                y: this.state.y,
                width: this.state.width,
                height: this.state.height,
                scale: this.state.scale
              }} />
          </Selector>
        </DragAndDrop>
        <div className="viewer__zoom">
          <input type="range" min="0" max="2" step="0.01"
            value={this.state.scale} onChange={e => this.onZoomChange(e)} />
        </div>
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
