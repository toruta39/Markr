import './Node.styl';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Node extends Component {
  render() {
    return (
      <li
        className={classNames({
          'node': true,
          'node--selected': this.props.selected
        })}
        onClick={e => {
          e.preventDefault();
          this.props.onClick(e);
        }}>
        <div className="node__name">
          {this.props.type}: {this.props.name}
        </div>
        {this.props.type === 'layer' &&
          <Node.ExportAsImage onClick={e => this.props.onExportAsImage(e)} />}
      </li>
    );
  }
}

Node.propTypes = {
  onClick: PropTypes.func.isRequired,
  onExportAsImage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
};

class ExportAsImage extends Component {
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

ExportAsImage.propTypes = {
  onClick: PropTypes.func.isRequired
};

Node.ExportAsImage = ExportAsImage;
