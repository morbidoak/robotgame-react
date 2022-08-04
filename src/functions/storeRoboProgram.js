import { AUTOSAVE_STORAGE_NAME } from '../config.js';
import { initGame, initRoboProgram } from './initRoboProgram.js';

export function saveRoboProgram(state, slotName = AUTOSAVE_STORAGE_NAME) {
  localStorage.setItem(slotName, JSON.stringify({...state, game: initGame(state.field, state.program.procedures)}));
}

export function loadRoboProgram(slotname = AUTOSAVE_STORAGE_NAME) {
  let storedValue = localStorage.getItem(slotname);
  if (storedValue === null) {
    return initRoboProgram();
  } else {
    return JSON.parse(storedValue);
  }
}