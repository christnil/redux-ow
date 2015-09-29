import * as types from '../constants/ActionTypes';

export function selectSupplement(id) {
  return { type: types.SELECT_SUPPLEMENT, id };
}
