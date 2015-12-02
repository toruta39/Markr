import React, { Component, PropTypes } from 'react';
import CopyableText from './CopyableText';
import CopyableTextarea from './CopyableTextarea';

export default class Detail extends Component {
  getTextDetail() {
    const text = this.props.node.text;

    return text ? [
      <div className="form-group">
        <label>Font name</label>
        <CopyableText value={ text.font.name } onCopy={ this.props.onCopy } />
      </div>,
      <div className="form-group">
        <label>Font size</label>
        <CopyableText value={ text.font.sizes[0] + '' } onCopy={ this.props.onCopy } />
      </div>,
      <div className="form-group">
        <label>Color</label>
        <CopyableText value={ text.font.colors[0].join() } onCopy={ this.props.onCopy } />
      </div>,
      <div className="form-group">
        <label>Alignment</label>
        <CopyableText value={ text.font.alignment[0] } onCopy={ this.props.onCopy } />
      </div>,
      <div className="form-group">
        <label>Line height</label>
        <CopyableText value={ text.font.leadings[0] + '' } onCopy={ this.props.onCopy } />
      </div>,
      <div className="form-group">
        <label>Text</label>
        <CopyableTextarea value={text.value} onCopy={this.props.onCopy} />
      </div>
    ] : null;
  }

  render() {
    // TODO: add export as image feature
    return (
      <section className="pane-sm pane sidebar">
        { this.props.node ? <div className="padded">
          <div className="form-group">
            <label>Visibility</label>
            <CopyableText value={ this.props.node.visible } onCopy={ this.props.onCopy } />
          </div>
          <div className="form-group">
            <label>Name</label>
            <CopyableText value={ this.props.node.name } onCopy={ this.props.onCopy } />
          </div>
          <div className="form-group">
            <label>Type</label>
            <CopyableText value={ this.props.node.type } onCopy={ this.props.onCopy } />
          </div>
          { this.getTextDetail() }
          <div className="form-group">
            <label>Top</label>
            <CopyableText value={ this.props.node.top } onCopy={ this.props.onCopy } />
          </div>
          <div className="form-group">
            <label>Right</label>
            <CopyableText value={ this.props.node.right } onCopy={ this.props.onCopy } />
          </div>
          <div className="form-group">
            <label>Bottom</label>
            <CopyableText value={ this.props.node.bottom } onCopy={ this.props.onCopy } />
          </div>
          <div className="form-group">
            <label>Left</label>
            <CopyableText value={ this.props.node.left } onCopy={ this.props.onCopy } />
          </div>
          <div className="form-group">
            <label>Width</label>
            <CopyableText value={ this.props.node.width } onCopy={ this.props.onCopy } />
          </div>
          <div className="form-group">
            <label>Height</label>
            <CopyableText value={ this.props.node.height } onCopy={ this.props.onCopy } />
          </div>
        </div> : null }
      </section>
    );
  }
}

Detail.propTypes = {
  onCopy: PropTypes.func.isRequired,
  node: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};
