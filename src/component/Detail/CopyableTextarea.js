import React, { Component, PropTypes } from 'react';
import CopyableText from './CopyableText';

export default class CopyableTextarea extends CopyableText {
  render() {
    return (
      <div>
        <textarea readOnly value={this.props.value} />
        <button onClick={e => this.onCopyClick(e)}>
          {this.state.isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    );
  }
}

CopyableTextarea.propTypes = { ...CopyableText.propTypes };
