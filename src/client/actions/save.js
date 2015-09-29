import * as types from '../constants/ActionTypes';
import http from 'axios';

function saveSupplementsRequest(supplements) {
   return {
      type: types.SAVE_SUPPLEMENTS_REQUEST,
      supplements
   };
}

function saveSupplementsResponse(response) {
   return {
      type: types.SAVE_SUPPLEMENTS_RESPONSE,
      response
   };
}

function saveSupplementsError(response) {
   return {
      type: types.SAVE_SUPPLEMENTS_ERROR,
      response
   };
}

export function saveSupplements(supplements) {
   return function (dispatch) {
      dispatch(saveSupplementsRequest(supplements));

      return http.post(`/save`, {supplements})
         .then(response => dispatch(saveSupplementsResponse(response)))
         .catch(response => dispatch(saveSupplementsResponse(response)));
   };
}
