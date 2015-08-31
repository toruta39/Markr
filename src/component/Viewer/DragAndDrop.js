import React, { Component, PropTypes } from 'react';

export default class DragAndDrop extends Component {
  render() {
    return (
      <div className="viewer__drag-and-drop"
        onDragOver={e => e.preventDefault()}
        onDragEnd={e => e.preventDefault()}
        onDragLeave={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          e.stopPropagation();
          this.props.onDrop(e.dataTransfer.files[0]);
        }}>
        {this.props.children}
      </div>
    );
  }
}

DragAndDrop.propTypes = {
  onDrop: PropTypes.func.isRequired
};
