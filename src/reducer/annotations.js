const initialData = {
  selection: [],
  loading: false,
  nodes: []
}

export default function sourceData(state=initialData, action) {
  switch (action.type) {
    // TODO:
    // ADD_ANNOTATION
    // SELECT_ANNOTATION
    // UPDATE_ANNOTATION
    // DELETE_ANNOTATION
    default:
      return state;
  }
}
