import './Zoomer.scss';
import React, { Component, PropTypes } from 'react';

export default class Zoomer extends Component {
  render() {
    return <div className="zoomer"
      onWheel={ (e) => {
        this.props.onZoomChange(
          Math.max(this.props.min,
            Math.min(this.props.max, this.props.scale + e.deltaY / 100)
          )
        )
      } }>
      { this.props.children }
      <div className="zoomer__range-input">
        <input type="range" step="0.01" min={ this.props.min }
          max={ this.props.max }
          value={ this.props.scale }
          onChange={ (e) => this.props.onZoomChange(+e.target.value) } />
      </div>
    </div>;
  }
}

Zoomer.propTypes = {
  scale: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onZoomChange: PropTypes.func.isRequired
};
