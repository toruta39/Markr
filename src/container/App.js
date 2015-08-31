import './App.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openFile, selectNode, exportNodeAsImage, setVisibilityFilter, VisibilityFilters } from '../actions';
import Viewer from '../component/Viewer';
import Hierarchy from '../component/Hierarchy';
import Node from '../component/Node';
import Detail from '../component/Detail';

class App extends Component {
  render() {
    const { dispatch, meta, preview, sourceData } = this.props;

    return (
      <div className="app">
        <Viewer src={preview.imgPath} nodes={sourceData.nodes} onDrop={file => dispatch(openFile(file))} />
        <Hierarchy>
          {sourceData.nodes.map((node, index) =>
            <Node
              {...node}
              key={index}
              selected={sourceData.selection.indexOf(index) > -1}
              onClick={() => dispatch(selectNode(index))}
              onExportAsImage={() => dispatch(exportNodeAsImage(index))} />
          )}
        </Hierarchy>
        <Detail node={sourceData.nodes[sourceData.selection[sourceData.selection.length - 1]] || sourceData.document || null} />
      </div>
    );
  }
}

function inject(state) {
  return {
    ...state
  };
}

export default connect(inject)(App);
