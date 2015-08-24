import { ADD_NODE, SELECT_NODE, RESET_NODES } from '../actions';

export default function nodes(state=[], action) {
  switch (action.type) {
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
