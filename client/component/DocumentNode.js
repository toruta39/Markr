import React from 'react';

export default class DocumentNode extends React.Component {
  render() {
    return <li>DocumentNode: { this.props.node.name }</li>;
  }
}
