import { initModals } from "../../functions/initRoboProgram.js"

export default function modals(state={}, action) {
  switch (action.type) {
    case "RESET_STATE":
      return initModals();

    case "SET_STATE":
      return action.newState.modals;

    case "ALERT_WINDOW": {
      let newState = {
        windowType: "alert",
        params: {
          label: action.label, 
          message: action.message
        },
      }
      if (state.windowType === null) {
        return {
          ...newState,
          queue: [],
        }
      } else {
        return {
          ...state,
          queue: [...state.queue, newState],
        }
      }
    }

    case "CONFIRM_WINDOW": {
      let newState = {
        windowType: "confirm",
        params: {
          label: action.label, 
          message: action.message, 
          onOk: action.onOk,
          onCancel: action.onCancel,
        },
      }
      if (state.windowType === null) {
        return {
          ...newState,
          queue: [],
        }
      } else {
        return {
          ...state,
          queue: [...state.queue, newState],
        }
      }
    }

    case "PROMPT_WINDOW": {
      let newState = {
        windowType: "prompt",
        params: {
          label: action.label, 
          message: action.message, 
          onOk: action.onOk,
          onCancel: action.onCancel,
          defaultValue: action.defaultValue,
        },
      }
      if (state.windowType === null) {
        return {
          ...newState,
          queue: [],
        }
      } else {
        return {
          ...state,
          queue: [...state.queue, newState],
        }
      }
    }

    case "SELECT_WINDOW": {
      let newState = {
        windowType: "select",
        params: {
          label: action.label, 
          message: action.message, 
          collection: action.collection,
          onOk: action.onOk,
          onCancel: action.onCancel,
        },
      }
      if (state.windowType === null) {
        return {
          ...newState,
          queue: [],
        }
      } else {
        return {
          ...state,
          queue: [...state.queue, newState],
        }
      }
    }

    case "CLOSE_WINDOW":
      if (state.queue.length === 0) {
        return {
          windowType: null,
          params: {},
          queue: [],
        }
      } else {
        return {
          windowType: state.queue[0].windowType,
          params: state.queue[0].params,
          queue: state.queue.slice(1),
        }
      } 

    

    default:
      return state;
  }
}