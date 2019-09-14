export default function currentPost(state = '', action) {
  switch (action.type) {
    case 'selectCurrentPost':
      return action.data;
    default:
      return state;
  }
}
