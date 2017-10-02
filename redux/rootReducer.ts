
import { combineReducers } from 'redux';
import { battle } from './reducers';
console.log(battle);
const rootReducer = combineReducers({
  battle
});

export default rootReducer;
