import React from 'react';
import classNames from 'classnames';

import NodeActions from '../action/NodeActions';

export default class Node extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onNodeClick(e, {id: this.props.id});
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
