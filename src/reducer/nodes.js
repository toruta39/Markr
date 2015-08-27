import { SELECT_NODE, RESET_NODES, SET_FILE_HIERARCHY } from '../actions';

export default function sourceData(state=[], action) {
  switch (action.type) {
    case SET_FILE_HIERARCHY:
      if (action.tree.document && action.tree.children) {
        return parsePSDTreeToNodes(action.tree.children);
      } else {
        console.error('invalid tree');
        return [];
      }
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

function parsePSDTreeToNodes(tree, nodes=[], path=[]) {
  let parentIndex = nodes.length - 1;
  path = [...path, 0];

  tree.forEach(leaf => {
    let node = {
      ...leaf,
      parent: parentIndex,
      selected: false,
      path: [...path]
    };

    delete node.children;
    nodes.push(node);

    if (leaf.children) {
      parsePSDTreeToNodes(leaf.children, nodes, path);
    }

    path[path.length - 1]++;
  });

  return nodes;
}
