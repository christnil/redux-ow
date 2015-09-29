import { SAVE_SUPPLEMENTS_REQUEST, SAVE_SUPPLEMENTS_RESPONSE, SAVE_SUPPLEMENTS_ERROR } from '../constants/ActionTypes';

export default function save(state = false, action) {
   switch (action.type) {
      case SAVE_SUPPLEMENTS_REQUEST:
         return true;
      case SAVE_SUPPLEMENTS_RESPONSE:
      case SAVE_SUPPLEMENTS_ERROR:
         return false;

      default:
         return state;
   }
}
