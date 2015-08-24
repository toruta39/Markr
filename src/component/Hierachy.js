import React from 'react';
import defineBound from '../util/defineBound';

import Node from './Node';

import NodeStore from '../store/NodeStore';
import NodeActions from '../action/NodeActions';

export default class Hierachy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: NodeStore.getAll()
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
  }

  componentDidMount() {
    NodeStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    NodeStore.removeListener('change', this.onChange);
  }

  onNodeClick(e, data) {
    e.preventDefault();

    console.log('%s %s %s', e.button, e.shiftKey, e.ctrlKey);

    if (e.button === 0) {
      NodeActions.select(data.id);
    }
  }

  onChange() {
    this.setState({
      nodes: NodeStore.getAll()
    });
  }

  onClick(e) {
    e.preventDefault();
    NodeActions.create('test');
  }

  render() {
    return (
      <div>
        Hierachy
        <ul>
          {this.state.nodes.map(function(node) {
            return (
              <Node key={node.id} id={node.id} selected={node.selected} name={node.name} onNodeClick={this.onNodeClick} />
            );
          }, this)}
        </ul>
        <a href="#" onClick={this.onClick}>Create</a>
      </div>
    );
  }
}
