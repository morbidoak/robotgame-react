import { combineReducers } from 'redux';
import program from './program.js';
import field from './field.js';
import game from './game.js';
import modals from './modals.js';

export default combineReducers({
  program,
  field,
  game,
  modals,
});
