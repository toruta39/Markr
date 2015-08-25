import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragAndDrop from '../component/DragAndDrop';
import Hierarchy from '../component/Hierarchy';
import { openFile, selectNode, setVisibilityFilter, VisibilityFilters } from '../actions';

class App extends Component {
  render() {
    const { dispatch, visibleNodes, visibilityFilter } = this.props;

    return (
      <div>
        <DragAndDrop
          onDrop={file => dispatch(openFile(file))} />
        <Hierarchy
          nodes={visibleNodes}
          onNodeClick={index =>
            dispatch(selectNode(index))
          } />
      </div>
    );
  }
}

function selectNodes(nodes, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return nodes;
    case VisibilityFilters.SHOW_TEXT_NODE:
      return nodes.filter(node => node.type === 'TEXT');
  }
}

function select(state) {
  return {
    visibleNodes: selectNodes(state.nodes, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

export default connect(select)(App);
