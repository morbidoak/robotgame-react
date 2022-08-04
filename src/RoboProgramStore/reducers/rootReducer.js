import { combineReducers } from 'redux';
import program from './program.js';
import field from './field.js';
import game from './game.js';

export default combineReducers({
  program,
  field,
  game,
});
