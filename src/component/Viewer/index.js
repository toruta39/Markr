import './index.scss';
import React, { Component, PropTypes, findDOMNode } from 'react';
import DragAndDrop from './DragAndDrop';
import Selector from './Plugin/Selector';

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docWidth: 0,
      docHeight: 0,
      x: 0,
      y: 0,
      scale: 1
    };
  }

  onZoomChange(e) {
    this.setState({ scale: +e.target.value });
  }

  updateXY(pos) {
    this.setState(pos);
  }

  componentDidMount() {
    let rect = findDOMNode(this).getBoundingClientRect();

    this.setState({
      width: rect.width,
      height: rect.height,
      x: 0,
      y: 0
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
          {this.props.src && (
            <Selector
              {...this.state}
              nodes={this.props.nodes}
              selectedNode={this.props.selectedNode}
              onUpdateXY={(pos) => this.updateXY(pos)}
              onSelect={this.props.onSelect}>
              <div className="viewer__container" style={this.getContainerStyle()}>
                {this.props.src && <img className="viewer__preview-layer" src={this.props.src} />}
              </div>
            </Selector>
          )}
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
