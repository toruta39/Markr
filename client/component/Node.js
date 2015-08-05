import React from 'react';
import classNames from 'classnames';
import defineBound from '../util/defineBound';

import NodeActions from '../action/NodeActions';

export default class Node extends React.Component {
  constructor(props) {
    super(props);

    defineBound({
      onClick: function(e) {
        this.props.onNodeClick(e, {id: this.props.id});
      }
    }, this);
  }

  render() {
    return (
      <li className={classNames({
        'node': true,
        'node--selected': this.props.selected
      })} onClick={this.onClick}>
        <div className="node__name">{this.props.id}: {this.props.name}</div>
      </li>
    );
  }
}
