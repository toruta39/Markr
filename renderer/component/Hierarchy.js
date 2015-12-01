import React, { Component, PropTypes } from 'react';
import Node from './Node';

export default class Hierarchy extends Component {
  render() {
    return (
      <section className="pane-sm pane sidebar">
        <div className="nav-group">
          <ul className="list-group">
            {this.props.children}
          </ul>
        </div>
      </section>
    );
  }
}

Hierarchy.propTypes = {
  children: PropTypes.node.isRequired
};
