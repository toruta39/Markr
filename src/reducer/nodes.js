import { ADD_NODE, SELECT_NODE, RESET_NODES, SET_FILE_HIERARCHY } from '../actions';

export default function nodes(state=[], action) {
  switch (action.type) {
    case SET_FILE_HIERARCHY:
      if (action.tree.document && action.tree.children) {
        return parsePSDTreeToNodes(action.tree.children);
      } else {
        console.error('invalid tree');
        return [];
      }
    case ADD_NODE:
      return [
        ...state,
        {
          name: action.name,
          selected: false
        }
      ];
    case SELECT_NODE:
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          selected: true
        },
        ...state.slice(action.index + 1)
      ];
    case RESET_NODES:
      return action.nodes || [];
    default:
      return state;
  }
}

function parsePSDTreeToNodes(tree, nodes=[]) {
  let parentIndex = nodes.length - 1;

  tree.forEach(leaf => {
    nodes.push({
      ...leaf,
      parent: parentIndex,
      selected: false
    });

    if (leaf.children) {
      parsePSDTreeToNodes(leaf.children, nodes);
      delete leaf.children;
    }
  });

  return nodes;
}
