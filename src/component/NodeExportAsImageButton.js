import React, { Component, PropTypes } from 'react';

export default class NodeExportAsImageButton extends Component {
  render() {
    return (
      <button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          this.props.onClick(e)
        }}>
        Export as image
      </button>
    );
  }
}

Node.propTypes = {
  onClick: PropTypes.func.isRequired
};
