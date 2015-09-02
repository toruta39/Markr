import { SET_FILE_HIERARCHY, SELECT_NODE, RESET_NODES } from '../actions';

const initialData = {
  selection: [],
  loading: false,
  document: {
    width: 0,
    height: 0
  },
  nodes: []
}

export default function sourceData(state=initialData, action) {
  switch (action.type) {
    case SET_FILE_HIERARCHY:
      return {
        ...state,
        loading: false,
        document: action.tree.document,
        nodes: normalize(action.tree.children)
      };
    case SELECT_NODE:
      return {
        ...state,
        selection: ~action.index ? [action.index] : []
      };
    case RESET_NODES:
      return {
        ...state,
        nodes: []
      };
    default:
      return state;
  }
}

function normalize(tree, nodes=[], parents=[]) {
  parents = [...parents, nodes.length - 1];
  const parent = nodes[parents[parents.length - 1]];

  tree.forEach(leaf => {
    let node = {
      ...leaf,
      parents,
      collapsed: false,
      children: []
    };

    nodes.push(node);

    if (parent) {
      parent.children.push(nodes.length - 1);
    }

    if (leaf.children) {
      normalize(leaf.children, nodes, parents);
    }
  });

  return nodes;
}
