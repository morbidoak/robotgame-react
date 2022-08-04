import {addInserters, clearInserters, insertCommand, deleteCommand, mapCode, checkProcedureTitle, newProcedureTitle} from '../../functions/mapProgram.js';

export default function program(state={}, action) {
  switch (action.type) {
    case "COMMAND_DRAG":
      return {
        procedures: addInserters(state.procedures, action.dragId),
        dragCode: action.dragCode,
        dragId: action.dragId,
        editing: true,
      }

    case "COMMAND_DROP":
      if (state.dragId === "") {
        return {
          procedures: insertCommand(state.procedures, action.dropId, state.dragCode),
          dragCode: "",
          dragId: "",
          editing: false,
        }
      } else {
        return {
          procedures: insertCommand(deleteCommand(state.procedures, state.dragId), action.dropId, state.dragCode),
          dragCode: "",
          dragId: "",
          editing: false,
        }
      }

    case "COMMAND_TRASH":
      return {
        procedures: clearInserters(deleteCommand(state.procedures, state.dragId)),
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "COMMAND_RELEASE":
      return {
        procedures: clearInserters(state.procedures),
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "CONDITION_DRAG":
      return {
        procedures: mapCode(state.procedures, "MARK_DROP_CONDITION", {avoidId: action.dragCode.id, parentDrop: true}),
        dragCode: action.dragCode,
        dragId: action.dragCode.id,
        editing: true,
      }

    case "CONDITION_DROP": {
        return {
          procedures: mapCode(mapCode(state.procedures, "DELETE_CONDITION", {dropId: state.dragId}), "INSERT_CONDITION", {condition: state.dragCode, dropId: action.dropId}),
          dragCode: "",
          dragId: "",
          editing: false,
        }
    }

    case "CONDITION_TRASH":
      return {
        procedures: mapCode(state.procedures, "DELETE_CONDITION", {dropId: state.dragId}),
        dragCode: "",
        dragId: "",
        editing: false,
      }
  
    case "CONDITION_RELEASE":
      return {
        procedures: mapCode(state.procedures),
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "PROCEDURE_ADD": {
      return {
        ...state,
        procedures: mapCode(state.procedures, "ADD_PROCEDURE", {newTitle: newProcedureTitle(state.procedures, action.baseTitle = "")}),
      }
    }

    case "PROCEDURE_RENAME":
      if (checkProcedureTitle(state.procedures, action.newTitle)) {
        return {
          ...state,
          procedures: mapCode(state.procedures, "RENAME_PROCEDURE", {renameId: action.renameId, newTitle: action.newTitle}),
        }
      } else {
        return state;
      } 

    case "PROCEDURE_SET":
      return {
        ...state,
        procedures: mapCode(state.procedures, "PROCEDURE_SET", {callId: action.callId, procedureId: action.procedureId}),
      }

    case "PROCEDURE_DELETE":
      return {
        ...state,
        procedures: mapCode(state.procedures, "DELETE_PROCEDURE", {deleteId: action.deleteId}),
      }

    default:
      return state;
  }
}