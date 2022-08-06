import { addElement, removeElement } from "../../functions/editBoard.js";
import { initField } from "../../functions/initRoboProgram.js";

export default function field(state={}, action) {
  switch (action.type) {
    case "RESET_STATE":
      return initField();

    case "SET_STATE":
      return action.newState.field;

    case "HORIZONTAL_WALL_ADD": 
      return {
        ...state,
        hWalls: addElement(state.hWalls, {x:action.newX, y:action.newY})
      }

    case "HORIZONTAL_WALL_REMOVE":
      return {
        ...state,
        hWalls: removeElement(state.hWalls, {x:action.removeX, y:action.removeY})
      }

    case "VERTICAL_WALL_ADD": 
      return {
        ...state,
        vWalls: addElement(state.vWalls, {x:action.newX, y:action.newY})
      }
    
    case "VERTICAL_WALL_REMOVE":
      return {
        ...state,
        vWalls: removeElement(state.vWalls, {x:action.removeX, y:action.removeY})
      }

    case "PAINT_ADD":
      return {
        ...state,
        paints: addElement(state.paints, {x:action.newX, y:action.newY})
      }

    case "PAINT_REMOVE":
      return {
        ...state,
        paints: removeElement(state.paints, {x:action.removeX, y:action.removeY})
      }

    case "ROBOT_MOVE":
      return {
        ...state,
        robot: {x:action.newX, y:action.newY},
      }

    default:
      return state;
  }
}