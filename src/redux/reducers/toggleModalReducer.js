export default function toggleModal(state = false, action) {
  switch (action.type) {
    case 'toggleModal':
      return !state;
    default:
      return state;
  }
}
