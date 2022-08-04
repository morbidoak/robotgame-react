import { MOVE_TICKS, STEERING_ACTIONS, PAINT_ACTIONS } from '../config.js'

export function planBehavour(lastBehavour, newAction) {
  let result;
  if (newAction === "paint") {
    result = [...PAINT_ACTIONS[lastBehavour]];
  } else {
    result = [...STEERING_ACTIONS[lastBehavour][newAction[0]], ...Array(MOVE_TICKS).fill(newAction[0])];
  }
  return result;
}