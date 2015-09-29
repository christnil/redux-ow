import { SELECT_SUPPLEMENT } from '../constants/ActionTypes';

export default function supplements(state = [], action) {
  switch (action.type) {
  case SELECT_SUPPLEMENT:
    return state.map(supplement =>
      supplement.id === action.id ?
        Object.assign({}, supplement, { selected: !supplement.selected }) :
        supplement
    );

  default:
    return state;
  }
}
