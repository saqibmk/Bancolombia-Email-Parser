import initialtate from './initialState';

function summary(state = initialtate, action = {}) {
  switch (action.type) {
    case 'UPDATE_GRAND_TOTAL':
      return state;
    default:
      return state;
  }
}

export default summary;
