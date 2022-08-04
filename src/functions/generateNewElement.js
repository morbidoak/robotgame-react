import { nanoid } from 'nanoid';

export function newCommandCode(cmd) {
  if (cmd==="north" || cmd==="south" || cmd==="west" || cmd==="east" || cmd==="paint")
    return {type: "move", to: cmd, id: nanoid() };

  if (cmd==="loop" || cmd === "if")
    return {type: cmd, cond: {val: "empty", id: nanoid(), left: null, right:null}, code: [], id: nanoid() };

  if (cmd==="call")
    return {type: "call", src: "", id: nanoid() };
}

export function newConditionCode(cond) {
  if (cond==="north" || cond==="south" || cond==="west" || cond==="east" || cond==="paint")
    return {val: cond, id: nanoid(), left: null, right:null };

  if (cond==="and" || cond === "or")
    return {val: cond, id: nanoid(), left: {val: "empty", id: nanoid(), left: null, right:null}, right: {val: "empty", id: nanoid(), left: null, right:null} }

  if (cond==="not")
    return {val: "not", id: nanoid(), left: null, right: {val: "empty", id: nanoid(), left: null, right:null} }
}