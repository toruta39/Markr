import './Zoomer.scss';
import React, { Component, PropTypes } from 'react';
import Mousetrap from 'mousetrap';

export default class Zoomer extends Component {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(value) {
    this.props.onZoomChange(
      Math.max(this.props.min,
        Math.min(this.props.max, value)
      )
    );
  }

  componentDidMount() {
    let scaleLessThanOne = [0.05, 0.125, 0.17, 0.25, 0.33, 0.5, 0.67, 1];

    Mousetrap.bind('command+0', () => {
      // zoom to 100%
      this.onUpdate(1);
    });
    Mousetrap.bind('command+=', () => {
      // zoom in
      let result;
      if (this.props.scale >= 1) {
        result = Math.floor(this.props.scale + 1);
      } else {
        result = scaleLessThanOne
        .reduce((acc, item) => {
          acc.unshift(item);
          return acc;
        }, [])
        .reduce((acc, item) => this.props.scale >= item ? acc : item,
          scaleLessThanOne[length - 1]);
      }
      this.onUpdate(result);
    });
    Mousetrap.bind('command+-', () => {
      // zoom out
      let result;
      if (this.props.scale > 1) {
        result = Math.ceil(this.props.scale - 1);
      } else {
        result = scaleLessThanOne.reduce((acc, item) => {
          return this.props.scale <= item ? acc : item;
        }, scaleLessThanOne[0]);
      }
      this.onUpdate(result);
    });
  }

  componentWillUnmout() {
    Mousetrap.unbind('command+=');
    Mousetrap.unbind('command+-');
  }

  render() {
    return <div className="zoomer"
      onWheel={ (e) => this.onUpdate(this.props.scale + e.deltaY / 100) }>
      { this.props.children }
      <div className="zoomer__range-input">
        <input type="range" step="0.01" min={ this.props.min }
          max={ this.props.max }
          value={ this.props.scale }
          onChange={ (e) => this.onUpdate(+e.target.value) } />
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
