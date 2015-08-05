import {EventEmitter} from 'events';
import assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher';

const _nodes = [];

function create(item) {
  let id = _nodes.length;

  _nodes[id] = {
    id: id,
    selected: false,
    name: item.name
  };
}

const NodeStore = assign({}, EventEmitter.prototype, {
  get: function(id) {
    return _nodes[id];
  },
  getAll: function() {
    return _nodes;
  },
  emitChange: function() {
    this.emit('change');
  }
});

AppDispatcher.register(function(payload) {
  let item;

  switch (payload.actionType) {
    case 'NODE_CREATE':
      item = { name: payload.name };

      create(item);
      NodeStore.emitChange();

      break;

    case 'NODE_SELECT':
      item = NodeStore.get(payload.id);

      if (item) {
        item.selected = true;
      }
      NodeStore.emitChange();

      break;

    default:
      // no op
  }
});

export default NodeStore;
