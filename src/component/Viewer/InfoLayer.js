import React, { Component, PropTypes } from 'react';

export default class InfoLayer extends Component {
  render() {
    const borderWidth = 1;

    return (
      <div className="viewer__info-layer">
        {[...this.props.nodes].reverse().map((node, index) =>{
          const hue = Math.random() * 360 | 0;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: `${node.top - borderWidth}px`,
                left: `${node.left - borderWidth}px`,
                width: `${node.width}px`,
                height: `${node.height}px`,
                border: `${borderWidth}px solid hsl(${hue}, 100%, 75%)`,
                background: `hsla(${hue}, 100%, 75%, 0.2)`
              }} />
          );
        })}
      </div>
    );
  }
}

InfoLayer.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }))
};
