import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openFile, selectNode, exportNodeAsImage, setVisibilityFilter, VisibilityFilters } from '../actions';
import DragAndDrop from '../component/DragAndDrop';
import PreviewImage from '../component/PreviewImage';
import Hierarchy from '../component/Hierarchy';
import Node from '../component/Node';
import Detail from '../component/Detail';

class App extends Component {
  render() {
    const { dispatch, meta, preview, sourceData } = this.props;

    return (
      <div>
        <DragAndDrop
          onDrop={file => dispatch(openFile(file))} />
        {null && [ // comment out
          (
            <PreviewImage src={preview.imgPath} />
          ),
          (
            <Hierarchy>
              {visibleNodes.map((node, index) =>
                <Node
                  {...node}
                  key = {index}
                  onClick={() => dispatch(selectNode(index))}
                  onExportAsImage={() => dispatch(exportNodeAsImage(index))} />
              )}
            </Hierarchy>
          ),
          (
            <Detail
              node={selectedNode} />
          )
        ]}
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
