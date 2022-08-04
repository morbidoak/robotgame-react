import { initGame } from "../../functions/initRoboProgram.js";
import { planBehavour } from "../../functions/planBehavour.js";

export default function game(state = {}, action) {
  switch (action.type) {
    case "STOP":
      return initGame(action.field, action.procedures);

    case "PAUSE":
      return {...state, play: "pause"};
    
    case "PLAY_STEP":
      if (state.play === "stop") {
        return {...initGame(action.field, action.procedures), play: "play-step"};
      } else {
        return {...state, play: "play-step"};
      }

    case "PLAY_X1":
      if (state.play === "stop") {
        return {...initGame(action.field, action.procedures), play: "play-x1"};
      } else {
        return {...state, play: "play-x1"};
      }

    case "PLAY_X3":
      if (state.play === "stop") {
        return {...initGame(action.field, action.procedures), play: "play-x3"};
      } else {
        return {...state, play: "play-x3"};
      }
    
    case "TICK": {
      let play = state.play;
      if (state.tick === state.behavour.length-1) {
        if (state.step === state.workflow.length-1) {
          play = "finish";
        } else {
          if (play === "play-step") {
            play = "pause";
          }
        }
      }

      let tick = state.tick;
      if ((state.tick !== state.behavour.length-1)&&(play !== "finish")) {
        tick = state.tick+1;
      }

      let paints = [...state.paints];
      if ((state.tick === state.behavour.length-1)&&(state.workflow[state.step].action === "paint")) {
        paints.push({x: state.workflow[state.step].start.x, y: state.workflow[state.step].start.y});
      }

      let step = state.step;
      if ((state.tick === state.behavour.length-1) && (play !== "finish")) {
        step = state.step+1;
        tick = 0;
      }

      let error = state.workflow[step].error;

      let behavour = state.behavour;
      if (tick === 0) {
        if (error) {
          behavour = [ state.behavour.at(-1) ];
        } else {
          behavour = planBehavour(state.behavour.at(-1), state.workflow[step].action);
        }
      }

      return {
        ...state,
        paints: paints, 
        step: step, 
        tick: tick,
        behavour: behavour,
        play: play,
        error: error
      };
    }

    default:
      return state;
  }
}