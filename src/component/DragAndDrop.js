import React, { Component, PropTypes } from 'react';

export default class DragAndDrop extends Component {
  render() {
    return (
      <div
        onDragOver={e => e.preventDefault()}
        onDragEnd={e => e.preventDefault()}
        onDragLeave={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          e.stopPropagation();
          this.props.onDrop(e.dataTransfer.files[0]);
        }}>
        Drag and Drop
      </div>
    );
  }
}

DragAndDrop.propTypes = {
  onDrop: PropTypes.func.isRequired
};
