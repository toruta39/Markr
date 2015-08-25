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
      return state.map((node, i) => {
        return {
          ...node,
          selected: action.index === i
        };
      });
    case RESET_NODES:
      return action.nodes || [];
    default:
      return state;
  }
}

function parsePSDTreeToNodes(tree, nodes=[]) {
  let parentIndex = nodes.length - 1;

  tree.forEach(leaf => {
    let node = {
      ...leaf,
      parent: parentIndex,
      selected: false
    };

    delete node.children;
    nodes.push(node);

    if (leaf.children) {
      parsePSDTreeToNodes(leaf.children, nodes);
    }
  });

  return nodes;
}
