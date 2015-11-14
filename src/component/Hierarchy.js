import React, { Component, PropTypes } from 'react';
import Node from './Node';

export default class Hierarchy extends Component {
  render() {
    return (
      <section className="pane-sm pane sidebar">
        <div className="nav-group">
          <h2 className="nav-group-title">Hierarchy</h2>
          <ul>{this.props.children}</ul>
        </div>
      </section>
    );
  }
}

Hierarchy.propTypes = {
  children: PropTypes.node.isRequired
};
