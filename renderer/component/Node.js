import './Node.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Node extends Component {
  render() {
    return (
      <li
        className={ classNames({
          'list-group-item': true,
          'active': this.props.selected,
          'node': true,
          'node--hidden': this.props.hiddenInHierachy
        }) }
        onClick={ (e) => {
          e.preventDefault();
          this.props.onClick(e);
        } }>
        <div style={ {
          paddingLeft: this.props.parents.length * 10
        } }>
          { this.props.type === 'group' &&
            <span className={ classNames({
              'icon': true,
              'icon-right-dir': this.props.collapsed,
              'icon-down-dir': !this.props.collapsed,
              'node__collapsed-button': true
            }) } onClick={ (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.props.onToggleCollapsed();
            } }></span> }
          <span>{ this.props.name }</span>
        </div>
      </li>
    );
  }
}

Node.propTypes = {
  onClick: PropTypes.func.isRequired,
  onToggleCollapsed: PropTypes.func.isRequired,
  parents: PropTypes.arrayOf(PropTypes.number).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  hiddenInHierachy: PropTypes.bool.isRequired
};
