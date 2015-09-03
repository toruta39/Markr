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
                t<input readOnly value={this.props.node.top} />
                r<input readOnly value={this.props.node.right} />
                b<input readOnly value={this.props.node.bottom} />
                l<input readOnly value={this.props.node.left} />
              </div>
            </li>
            <li>
              <div>Size</div>
              <div>
                w<input readOnly value={this.props.node.width} />
                <button data-clipboard-text={this.props.node.width}>Copy</button>
                h<input readOnly value={this.props.node.height} />
                <button data-clipboard-text={this.props.node.height}>Copy</button>
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
