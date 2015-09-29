import { combineReducers } from 'redux';
import supplements from './supplements';
import save from './save';

const rootReducer = combineReducers({
  supplements,
  save
});

export default rootReducer;
