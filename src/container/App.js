import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openFile, selectNode, setVisibilityFilter, VisibilityFilters } from '../actions';
import DragAndDrop from '../component/DragAndDrop';
import Hierarchy from '../component/Hierarchy';
import Detail from '../component/Detail';

class App extends Component {
  render() {
    const { dispatch, selectedNode, visibleNodes, visibilityFilter } = this.props;

    return (
      <div>
        <DragAndDrop
          onDrop={file => dispatch(openFile(file))} />
        <Hierarchy
          nodes={visibleNodes}
          onNodeClick={index =>
            dispatch(selectNode(index))
          } />
        <Detail
          node={selectedNode} />
      </div>
    );
  }
}

function filterSelectedNode(nodes, index) {
  return ~index ? nodes[index] : null;
}

function filterVisibleNodes(nodes, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return nodes;
    case VisibilityFilters.SHOW_TEXT_NODE:
      return nodes.filter(node => node.type === 'TEXT');
  }
}

function select(state) {
  return {
    selectedNode: filterSelectedNode(state.nodes, state.file.selectedNodeIndex),
    visibleNodes: filterVisibleNodes(state.nodes, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

export default connect(select)(App);
