import React, { Component, PropTypes } from 'react';
import Node from './Node';

export default class Hierarchy extends Component {
  render() {
    return (
      <section>
        <h2>Hierarchy</h2>
        <ul>{this.props.children}</ul>
      </section>
    );
  }
}

Hierarchy.propTypes = {
  children: PropTypes.array.isRequired
};
