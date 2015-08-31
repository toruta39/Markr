import './index.scss';
import React, { Component, PropTypes, findDOMNode } from 'react';
import isChildDOMOf from '../../util/isChildDOMOf';
import DragAndDrop from './DragAndDrop';
import Mover from './Viewport/Mover';

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      scale: 1
    };
  }

  onZoomChange(e) {
    this.setState({ scale: +e.target.value });
    console.log(this.state.scale);
  }

  updateXY(pos) {
    this.setState(pos);
  }

  render() {
    return (
      <div className="viewer">
        <DragAndDrop
          onDrop={file => this.props.onDrop(file)} >
          <Mover
            {...this.state}
            src={this.props.src}
            onUpdateXY={(pos) => this.updateXY(pos)}/>
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
  onDrop: PropTypes.func.isRequired
};
