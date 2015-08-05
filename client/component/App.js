import React from 'react';
import Hierarchy from './Hierarchy';

import NodeStore from '../store/NodeStore';

export default class App extends React.Component {
  render() {
    return (
      <div>
        App
        <Hierarchy />
      </div>
    );
  }
}
