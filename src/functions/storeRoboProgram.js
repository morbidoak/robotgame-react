import { AUTOSAVE_STORAGE_NAME, STORAGE_PREFIX } from '../config.js';
import { initGame, initModals, initRoboProgram } from './initRoboProgram.js';

export function saveRoboProgram(state, slotName = AUTOSAVE_STORAGE_NAME, overwrite=true) {
  const fullSlotName = `${STORAGE_PREFIX}${slotName}`;
  if (overwrite || (localStorage.getItem(fullSlotName) === null)) {
    localStorage.setItem(fullSlotName, JSON.stringify({field: state.field, procedures: state.program.procedures}));
    return true;
  } else {
    return false;
  }
}

export function loadRoboProgram(slotName = AUTOSAVE_STORAGE_NAME) {
  const fullSlotName = `${STORAGE_PREFIX}${slotName}`;
  let storedValue = localStorage.getItem(fullSlotName);
  if (storedValue === null) {
    return initRoboProgram();
  } else {
    let parsedValue = JSON.parse(storedValue);
    return {
      program: {
        procedures: parsedValue.procedures,
        dragCode: "",
        dragId: "",
        editing: false,
      },
      field: parsedValue.field,
      game: initGame(parsedValue.field, parsedValue.procedures),
      modals: initModals(),
    }
  }
}

export function listOfRoboProgram() {
  let result = [];
  let keys = Object.keys(localStorage);
  
  for (let i=0; i<keys.length; i++) {
    if (keys[i].startsWith(STORAGE_PREFIX) && (keys[i] !== `${STORAGE_PREFIX}${AUTOSAVE_STORAGE_NAME}`)) {
      result.push(keys[i].slice(STORAGE_PREFIX.length));
    }
  }

  return result;
}