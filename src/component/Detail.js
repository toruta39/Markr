import React, { Component, PropTypes } from 'react';

export default class Detail extends Component {
  getTextDetail() {
    const text = this.props.node.text;

    return text ? [
      <li><div>Font name</div><div>{text.font.name}</div></li>,
      <li><div>Sizes</div><div>{text.font.sizes.join()}</div></li>,
      <li><div>Colors</div><div>{text.font.colors.join()}</div></li>,
      <li><div>Alignments</div><div>{text.font.alignment.join()}</div></li>,
      <li><div>Text</div><div>{text.value}</div></li>
    ] : null;
  }

  render() {
    return (
      <div>
        {this.props.node ? (
          <ul>
            <li><div>Visibility</div><div>{this.props.node.visible}</div></li>
            <li><div>Name</div><div>{this.props.node.name}</div></li>
            <li><div>Type</div><div>{this.props.node.type}</div></li>
            <li><div>Offset</div><div>t{this.props.node.top} r{this.props.node.right} b{this.props.node.bottom} l{this.props.node.left}</div></li>
            <li><div>Size</div><div>w{this.props.node.width} h{this.props.node.height}</div></li>
            {this.getTextDetail()}
          </ul>
        ) : <p>TODO: show document detail</p>}
      </div>
    );
  }
}

Detail.propTypes = {
  node: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
  })
};
