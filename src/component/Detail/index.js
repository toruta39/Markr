import React, { Component, PropTypes } from 'react';
import CopyableText from './CopyableText';
import CopyableTextarea from './CopyableTextarea';

export default class Detail extends Component {
  getTextDetail() {
    const text = this.props.node.text;

    return text ? [
      <li><div>Font name</div><div>{text.font.name}</div></li>,
      <li><div>Sizes</div><div>{text.font.sizes.join()}</div></li>,
      <li><div>Colors</div><div>{text.font.colors.join()}</div></li>,
      <li><div>Alignments</div><div>{text.font.alignment.join()}</div></li>,
      <li>
        <div>Text</div>
        <CopyableTextarea value={text.value} onCopy={this.props.onCopy} />
      </li>
    ] : null;
  }

  render() {
    return (
      <section className="panel">
        <h2 className="panel__title">Detail</h2>
        {this.props.node ? (
          <ul>
            <li><div>Visibility</div><div>{this.props.node.visible}</div></li>
            <li><div>Name</div><div>{this.props.node.name}</div></li>
            <li><div>Type</div><div>{this.props.node.type}</div></li>
            <li>
              <div>Offset</div>
              <div>
                <CopyableText value={this.props.node.top + 'px'} onCopy={this.props.onCopy} />
                <CopyableText value={this.props.node.right + 'px'} onCopy={this.props.onCopy} />
                <CopyableText value={this.props.node.bottom + 'px'} onCopy={this.props.onCopy} />
                <CopyableText value={this.props.node.left + 'px'} onCopy={this.props.onCopy} />
              </div>
            </li>
            <li>
              <div>Size</div>
              <div>
                <CopyableText value={this.props.node.width + 'px'} onCopy={this.props.onCopy} />
                <CopyableText value={this.props.node.height + 'px'} onCopy={this.props.onCopy} />
              </div>
            </li>
            {this.getTextDetail()}
          </ul>
        ) : null}
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
