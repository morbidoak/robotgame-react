import i18n from '../i18n.js';
import { TURNS_LIMIT } from '../config.js';
import executeRoboProgram from './executeRoboProgram.js';


export function initProcedures() {
  return [{
    title: i18n.t("new program"),
    id: '0',
    code: [],
  }];
}

export function initModals() {
  return {
    windowType: null,
    params: {},
    queue: [],
  }
}

export function initProgram() {
  return {
    procedures: initProcedures(),
    dragCode: "",
    dragId: "",
    editing: false,
  }
}

export function initField() {
  return {
    robot: {
      x: 1,
      y: 1
    },
    hWalls: [],
    vWalls: [],
    paints: [],
  };
}

export function initGame(field=initField(), procedures=initProcedures()) {
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
      program: initProgram(),
      field: initField(),
      game: initGame(),
      modals: initModals(),
  }
}