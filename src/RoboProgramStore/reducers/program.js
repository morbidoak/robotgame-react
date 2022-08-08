import { initProgram } from '../../functions/initRoboProgram.js';
import {checkProcedureTitle, newProcedureTitle} from '../../functions/procedureTitle.js';
import mapProgram from '../../functions/mapProgram.js';

export default function program(state={}, action) {
  switch (action.type) {
    case "RESET_STATE":
      return initProgram();

    case "SET_STATE":
      return action.newState.program;

    case "COMMAND_DRAG":
      return {
        procedures: mapProgram(state.procedures, "ADD_INSERTERS", {avoidId: action.dragCode.id}),
        dragCode: action.dragCode,
        dragId: action.dragId,
        editing: true,
      }

    case "COMMAND_DROP":
      return {
        procedures: mapProgram(mapProgram(state.procedures, "DELETE_COMMAND", {deleteId: state.dragCode.id}), "INSERT_COMMAND", {insertId: action.dropId, command: state.dragCode}),
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "COMMAND_TRASH":
      return {
        procedures: mapProgram(mapProgram(state.procedures, "DELETE_COMMAND", {deleteId: state.dragCode.id}), "DELETE_INSERTERS"), 
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "COMMAND_RELEASE":
      return {
        procedures: mapProgram(state.procedures, "DELETE_INSERTERS"),
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "CONDITION_DRAG":
      return {
        procedures: mapProgram(state.procedures, "MARK_DROP_CONDITION", {avoidId: action.dragCode.id, parentDrop: true}),
        dragCode: action.dragCode,
        dragId: action.dragCode.id,
        editing: true,
      }

    case "CONDITION_DROP": {
        return {
          procedures: mapProgram(mapProgram(state.procedures, "DELETE_CONDITION", {dropId: state.dragId}), "INSERT_CONDITION", {condition: state.dragCode, dropId: action.dropId}),
          dragCode: "",
          dragId: "",
          editing: false,
        }
    }

    case "CONDITION_TRASH":
      return {
        procedures: mapProgram(state.procedures, "DELETE_CONDITION", {dropId: state.dragId}),
        dragCode: "",
        dragId: "",
        editing: false,
      }
  
    case "CONDITION_RELEASE":
      return {
        procedures: mapProgram(state.procedures),
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "PROCEDURE_ADD": {
      return {
        ...state,
        procedures: mapProgram(state.procedures, "ADD_PROCEDURE", {newTitle: newProcedureTitle(state.procedures, action.baseTitle = "")}),
      }
    }

    case "PROCEDURE_RENAME":
      if (checkProcedureTitle(state.procedures, action.newTitle)) {
        return {
          ...state,
          procedures: mapProgram(state.procedures, "RENAME_PROCEDURE", {renameId: action.renameId, newTitle: action.newTitle}),
        }
      } else {
        return state;
      } 

    case "PROCEDURE_SET":
      return {
        ...state,
        procedures: mapProgram(state.procedures, "PROCEDURE_SET", {callId: action.callId, procedureId: action.procedureId}),
      }

    case "PROCEDURE_DELETE":
      return {
        ...state,
        procedures: mapProgram(state.procedures, "DELETE_PROCEDURE", {deleteId: action.deleteId}),
      }

    default:
      return state;
  }
}