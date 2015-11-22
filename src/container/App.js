import './App.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import { openFile, selectNode, unselectNode, exportNodeAsImage, setVisibilityFilter, copyContent, copyNodeText, copyTextStyle } from '../actions';
import Viewer from '../component/Viewer';
import Hierarchy from '../component/Hierarchy';
import Node from '../component/Node';
import Detail from '../component/Detail';

class App extends Component {
  // TODO move hotkey mapping to another component, use composition
  componentDidMount() {
    const { dispatch } = this.props;

    Mousetrap.bind('esc', e => dispatch(unselectNode()));
    Mousetrap.bind('command+c', (e) => dispatch(copyNodeText(this.props.selectedNode)));
    Mousetrap.bind('command+alt+c', (e) => dispatch(copyTextStyle(this.props.selectedNode)));
  }

  render() {
    const { dispatch, meta, preview, sourceData, selectedNode } = this.props;

    return (
      <div className="app pane-group">
        <Viewer
          src={preview.imgPath}
          document={sourceData.document}
          nodes={sourceData.nodes}
          selectedNode={selectedNode}
          onDrop={file => dispatch(openFile(file))}
          onSelect={index => dispatch(selectNode(index))} />
        <Hierarchy>
          {sourceData.nodes.map((node, index) =>
            <Node {...node}
              key={index}
              selected={sourceData.selection.indexOf(index) > -1}
              onClick={() => dispatch(selectNode(index))} />
          )}
        </Hierarchy>
        <Detail node={selectedNode || sourceData.document || null}
          onCopy={content => dispatch(copyContent(content))} />
      </div>
    );
  }
}

function inject(state) {
  const sourceData = state.sourceData;

  return {
    ...state,
    selectedNode: sourceData.nodes[sourceData.selection[sourceData.selection.length - 1]]
  };
}

export default connect(inject)(App);
