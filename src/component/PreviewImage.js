import React, { Component, PropTypes } from 'react';

export default class PreviewImage extends Component {
  render() {
    return this.props.src ? <img src={this.props.src} /> : <div />;
  }
}

PreviewImage.propTypes = {
  src: PropTypes.string
};
