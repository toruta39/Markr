import AppDispatcher from '../dispatcher/AppDispatcher';

const NodeActions = {
  create: function(name) {
    AppDispatcher.dispatch({
      actionType: 'NODE_CREATE',
      name: name
    });
  },
  select: function(id) {
    AppDispatcher.dispatch({
      actionType: 'NODE_SELECT',
      id: id
    });
  }
};

export default NodeActions;
