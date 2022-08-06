import { newCommandCode, newConditionCode } from '../functions/generateNewElement.js'

export const newCommand = (cmd) => (
  {
    type: "COMMAND_DRAG",
    dragCode: newCommandCode(cmd),
    dragId: "",
  }
);

export const moveCommand = (cmd) => (
  {
    type: "COMMAND_DRAG",
    dragCode: cmd,
    dragId: cmd.id,
  }
);

export const dropCommand = (dropId) => (
  {
    type: "COMMAND_DROP",
    dropId: dropId,
  }
);

export const trashCommand = () => (
  {
    type: "COMMAND_TRASH",
  }
);

export const releaseCommand = () => (
  {
    type: "COMMAND_RELEASE",
  }
);

export const newCondition = (cond) => (
  {
    type: "CONDITION_DRAG",
    dragCode: newConditionCode(cond),
    dragId: "",
  }
);

export const moveCondition = (cond) => (
  {
    type: "CONDITION_DRAG",
    dragCode: cond,
    dragId: cond.id,
  }
);

export const dropCondition = (dropId) => (
  {
    type: "CONDITION_DROP",
    dropId: dropId,
  }
);

export const trashCondition = () => (
  {
    type: "CONDITION_TRASH",
  }
);

export const releaseCondition = () => (
  {
    type: "CONDITION_RELEASE",
  }
);

export const newProcedure = (title) => (
  {
    type: "PROCEDURE_ADD",
    newTitle: title,
  }
);

export const renameProcedure = (id, title) => (
  {
    type: "PROCEDURE_RENAME",
    newTitle: title,
    renameId: id,
  }
);

export const setProcedureCall = (callId, procedureId) => (
  {
    type: "PROCEDURE_SET",
    callId: callId,
    procedureId: procedureId,
  }
);

export const deleteProcedure = (id) => (
  {
    type: "PROCEDURE_DELETE",
    deleteId: id,
  }
);

export const addHorizontalWall = (x, y) => (
  {
    type: "HORIZONTAL_WALL_ADD",
    newX: x,
    newY: y,
  }
);

export const removeHorizontalWall = (x, y) => (
  {
    type: "HORIZONTAL_WALL_REMOVE",
    removeX: x,
    removeY: y,
  }
);

export const addVerticalWall = (x, y) => (
  {
    type: "VERTICAL_WALL_ADD",
    newX: x,
    newY: y,
  }
);

export const removeVerticalWall = (x, y) => (
  {
    type: "VERTICAL_WALL_REMOVE",
    removeX: x,
    removeY: y,
  }
);

export const addPaint = (x, y) => (
  {
    type: "PAINT_ADD",
    newX: x,
    newY: y,
  }
);

export const removePaint = (x, y) => (
  {
    type: "PAINT_REMOVE",
    removeX: x,
    removeY: y,
  }
);

export const moveRobot = (x, y) => (
  {
    type: "ROBOT_MOVE",
    newX: x,
    newY: y,
  }
);

export const playStep = (field, procedures) => (
  {
    type: "PLAY_STEP",
    field: field,
    procedures: procedures,
  }
);

export const playX1 = (field, procedures) => (
  {
    type: "PLAY_X1",
    field: field,
    procedures: procedures,
  }
);

export const playX3 = (field, procedures) => (
  {
    type: "PLAY_X3",
    field: field,
    procedures: procedures,
  }
);

export const stop = (field, procedures) => (
  {
    type: "STOP",
    field: field,
    procedures: procedures,
  }
);

export const pause = () => (
  {
    type: "PAUSE",
  }
);

export const tick = () => (
  {
    type: "TICK",
  }
);

export const alertWindow = (label, message) => (
  {
    type: "ALERT_WINDOW",
    label: label,
    message: message,
  }
);

export const confirmWindow = (label, message, onOk, onCancel=(()=>{})) => (
  {
    type: "CONFIRM_WINDOW",
    label: label,
    message: message,
    onOk: onOk,
    onCancel: onCancel,
  }
);

export const promptWindow = (label, message, defaultValue, onOk, onCancel=(()=>{})) => (
  {
    type: "PROMPT_WINDOW",
    label: label,
    message: message,
    onOk: onOk,
    onCancel: onCancel,
    defaultValue: defaultValue,
  }
);

export const selectWindow = (label, message, collection, onOk, onCancel=(()=>{})) => (
  {
    type: "SELECT_WINDOW",
    label: label,
    message: message,
    onOk: onOk,
    onCancel: onCancel,
    collection: collection,
  }
);

export const closeWindow = () => (
  {
    type: "CLOSE_WINDOW",
  }
);

export const resetState = () => (
  {
    type: "RESET_STATE",
  }
);

export const setState = (newState) => (
  {
    type: "SET_STATE",
    newState: newState,
  }
);
