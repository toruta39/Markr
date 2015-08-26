import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Node from './Node';

export default class Hierarchy extends Component {
  render() {
    return <ul>{this.props.children}</ul>;
  }
}

Hierarchy.propTypes = {
  children: PropTypes.array
};
