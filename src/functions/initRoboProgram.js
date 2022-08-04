import { DEFAULT_PROCEDURES, DEFAULT_FIELD, TURNS_LIMIT } from '../config.js';
import executeRoboProgram from './executeRoboProgram.js';

export function initGame(field, procedures) {
  return {
    paints: [...field.paints], 
    workflow: executeRoboProgram(procedures, field, TURNS_LIMIT), 
    step: 0,
    tick: -1,
    behavour: ["s"], 
    play: "stop",
    error: false,
  }
}

export function initRoboProgram() {
  return {
      program: {
        procedures: DEFAULT_PROCEDURES,
        dragCode: "",
        dragId: "",
        editing: false,
      },
      field: DEFAULT_FIELD,
      game: initGame(DEFAULT_FIELD, DEFAULT_PROCEDURES),
  }
}