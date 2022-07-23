import { nanoid } from 'nanoid';

function newCommandCode(cmd) {
  if (cmd==="north" || cmd==="south" || cmd==="west" || cmd==="east" || cmd==="paint")
    return {type: "move", to: cmd, id: nanoid() };

  if (cmd==="loop" || cmd === "if")
    return {type: cmd, cond: {val: "empty", id: nanoid(), left: null, right:null}, code: [], id: nanoid() };

  if (cmd==="call")
    return {type: "call", src: "", id: nanoid() };
}

function newConditionCode(cond) {
  if (cond==="north" || cond==="south" || cond==="west" || cond==="east" || cond==="paint")
    return {val: cond, id: nanoid(), left: null, right:null };

  if (cond==="and" || cond === "or")
    return {val: cond, id: nanoid(), left: {val: "empty", id: nanoid(), left: null, right:null}, right: {val: "empty", id: nanoid(), left: null, right:null} }

  if (cond==="not")
    return {val: "not", id: nanoid(), left: null, right: {val: "empty", id: nanoid(), left: null, right:null} }
}

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
