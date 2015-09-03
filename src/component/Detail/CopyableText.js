import React, { Component, PropTypes } from 'react';

export default class CopyableText extends Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = { isCopied: false };
  }

  onCopyClick(e) {
    e.preventDefault();

    this.props.onCopy({
      text: this.props.value
    });

    this.setState({ isCopied: true });

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(() => this.setState({ isCopied: false }), 1500);
  }

  render() {
    return (
      <div>
        <input readOnly value={this.props.value} />
        <button onClick={e => this.onCopyClick(e)}>
          {this.state.isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    );
  }
}

CopyableText.propTypes = {
  onCopy: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
