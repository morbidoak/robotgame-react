import Procedure from'./Procedure.js';
import CodeInstrument from'./CodeInstrument.js';
import Dustbin from'./Dustbin.js';
import {nanoid} from 'nanoid';
import { useReducer } from 'react';

const codeExample = {
  "_": [
    {type: "loop", cond:{val:"and", left: {val:"north", id:"wer"}, right: {val:"paint", id:"sdf"}, id:"qwe"}, id:"id1", code:[
      {type:"move", to: "north", id:"id2"},
      {type:"move", to: "paint", id:"id3"},
    ]},
  ],
};

function addInserters(code, avoid=0) {
  if (Array.isArray(code)) {
    let result = [];

    if (code.length === 0) {
      result.push({type: "insert", id: nanoid()});
    } else {
      for (let i=0; i<code.length; i++) {
        if ((code[i].id !== avoid) && ((i===0) || (code[i-1].id !== avoid))) result.push({type: "insert", id: nanoid()});
        if (("code" in code[i]) && (code[i].id !== avoid)) {
          result.push({...code[i], code: addInserters(code[i].code, avoid)});
        } else {
          result.push({...code[i]});
        }
      }
      if (code[code.length-1].id !== avoid) result.push({type: "insert", id: nanoid()});
    }
    return result;
  } else {
    let result = {};
    Object.keys(code).forEach(title => {result[title] = addInserters(code[title], avoid)});
    return result;
  }
}

function clearInserters(code) {
  if (Array.isArray(code)) {
    let result = [];
    for (let i=0; i<code.length; i++) {
      if (code[i].type !== "insert") {
        if ("code" in code[i]) {
          result.push({...code[i], code: clearInserters(code[i].code)});
        } else {
          result.push({...code[i]});
        }
      }
    }
    return result;
  } else {
    let result = {};
    Object.keys(code).forEach(title => {result[title] = clearInserters(code[title])});
    return result;
  }
}

function deleteCommand(code, commandId) {
  if (Array.isArray(code)) {
    let result = [];
    for (let i=0; i<code.length; i++) {
      if (code[i].id !== commandId) {
        if ("code" in code[i]) {
          result.push({...code[i], code: deleteCommand(code[i].code, commandId)});
        } else {
          result.push({...code[i]});
        }
      }
    }
    return result;
  } else {
    let result = {};
    Object.keys(code).forEach(title => {result[title] = deleteCommand(code[title], commandId)});
    return result;
  }
}

function insertCommand(code, inserterId, command) {
  if (Array.isArray(code)) {
    let result = [];
    for (let i=0; i<code.length; i++) {
      if ((code[i].type === "insert")&&(inserterId === code[i].id)) {
        result.push(command);
      } else {
        if ("code" in code[i]) {
          result.push({...code[i], code: insertCommand(code[i].code, inserterId, command)});
        } else {
          result.push({...code[i]});
        }
      }
    }
    return result;
  } else {
    let result = {};
    Object.keys(code).forEach(title => {result[title] = insertCommand(code[title], inserterId, command)});
    return result;
  }
}


function mapCode(code, func=null, params={}, level="program") {
  switch (level) {
    case "program": {
      let result = {};
      Object.keys(code).forEach(title => {result[title] = mapCode(code[title], func, params, "procedure")});
      return result;
    }

    case "procedure": {
      let result = [];
      for (let i=0; i<code.length; i++) {
        let item = {...code[i]}
        if ("code" in code[i]) item.code = mapCode(code[i].code, func, params, "procedure");
        if ("cond" in code[i]) item.cond = mapCode(code[i].cond, func, params, "condition");
        result.push(item);
      }
      return result;
    }

    case "condition": {
      if (func==="INSERT_CONDITION" && code.id === params.dropId) {
        return params.condition;
      }

      if (func==="DELETE_CONDITION" && code.id === params.dropId) {
        return {val:"empty", id:nanoid()};
      }

      let result = {val:code.val, id:code.id};

      if (func==="MARK_DROP_CONDITION") {
        if (code.id === params.avoidId) {
          result.drop = false;
        } else {
          result.drop = params.parentDrop;
        }
        if ("left" in code) result.left = mapCode(code.left, func, {...params, parentDrop:result.drop}, "condition");
        if ("right" in code) result.right = mapCode(code.right, func, {...params, parentDrop:result.drop}, "condition");
      } else {
        if ("left" in code) result.left = mapCode(code.left, func, params, "condition");
        if ("right" in code) result.right = mapCode(code.right, func, params, "condition");
      }

      return result;
    }
  }
}

function codeReducer(state, action) {
  switch (action.type) {
    case "cmdInsertBegin":
      return {
        src: addInserters(state.src),
        dragCode: action.dragCode,
        dragId: "",
        editing: true,
      }

    case "cmdMoveBegin":
      return {
        src: addInserters(state.src, action.dragId),
        dragCode: action.dragCode,
        dragId: action.dragId,
        editing: true,
      }

    case "cmdRelease":
      if (state.dragId === "") {
        return {
          src: insertCommand(state.src, action.dropId, state.dragCode),
          dragCode: "",
          dragId: "",
          editing: false,
        }
      } else {
        return {
          src: insertCommand(deleteCommand(state.src, state.dragId), action.dropId, state.dragCode),
          dragCode: "",
          dragId: "",
          editing: false,
        }
      }

    case "cmdMoveTrash":
      return {
        src: clearInserters(deleteCommand(state.src, state.dragId)),
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "cmdAbort":
      return {
        src: clearInserters(state.src),
        dragCode: "",
        dragId: "",
        editing: false,
      }

    case "condInsertBegin":
      return {
        src: mapCode(state.src, "MARK_DROP_CONDITION", {avoidId: "", parentDrop: true}),
        dragCode: action.dragCode,
        dragId: "",
        editing: true,
      }

    case "condMoveBegin":
      return {
        src: mapCode(state.src, "MARK_DROP_CONDITION", {avoidId: action.dragCode.id, parentDrop: true}),
        dragCode: action.dragCode,
        dragId: action.dragCode.id,
        editing: true,
      }

    case "condRelease":
      if (state.dragId === "") {
        return {
          src: mapCode(state.src, "INSERT_CONDITION", {condition: state.dragCode, dropId: action.dropId}),
          dragCode: "",
          dragId: "",
          editing: false,
        }
      } else {
        return {
          src: mapCode(mapCode(state.src, "DELETE_CONDITION", {dropId: state.dragId}), "INSERT_CONDITION", {condition: state.dragCode, dropId: action.dropId}),
          dragCode: "",
          dragId: "",
          editing: false,
        }
      }

    case "condMoveTrash":
      return {
        src: mapCode(state.src, "DELETE_CONDITION", {dropId: state.dragId}),
        dragCode: "",
        dragId: "",
        editing: false,
      }
  
    case "condAbort":
      return {
        src: mapCode(state.src),
        dragCode: "",
        dragId: "",
        editing: false,
      }
  }
}

function codeInit({code}) {
  return {
    src: structuredClone(codeExample),
    dragId: "",
    dragCode: "",
    editing: false,
  }
}


function CodeDesk() {
  const [code, dispatchCode] = useReducer(codeReducer, {codeExample}, codeInit);

  return (
    <div className="codeDesk">
      <div className="procedures">
        {Object.keys(code.src).map((title) => <Procedure title={title} code={code.src[title]} key={title} dispatchCode={(action) => dispatchCode(action)} />)}
      </div>
      <div className="codeInstrumentBar">
        <CodeInstrument key="north" title="north" type="NEW COMMAND" dragStart={(newId)=>dispatchCode({type: "cmdInsertBegin", dragCode: {type: "move", to: "north", id: newId }})} dragAbort={()=>dispatchCode({type: "cmdAbort"})} />
        <CodeInstrument key="south" title="south" type="NEW COMMAND" dragStart={(newId)=>dispatchCode({type: "cmdInsertBegin", dragCode: {type: "move", to: "south", id: newId }})} dragAbort={()=>dispatchCode({type: "cmdAbort"})} />
        <CodeInstrument key="east" title="east" type="NEW COMMAND" dragStart={(newId)=>dispatchCode({type: "cmdInsertBegin", dragCode: {type: "move", to: "east", id: newId }})} dragAbort={()=>dispatchCode({type: "cmdAbort"})} />
        <CodeInstrument key="west" title="west" type="NEW COMMAND" dragStart={(newId)=>dispatchCode({type: "cmdInsertBegin", dragCode: {type: "move", to: "west", id: newId }})} dragAbort={()=>dispatchCode({type: "cmdAbort"})} />
        <CodeInstrument key="paint" title="paint" type="NEW COMMAND" dragStart={(newId)=>dispatchCode({type: "cmdInsertBegin", dragCode: {type: "move", to: "paint", id: newId }})} dragAbort={()=>dispatchCode({type: "cmdAbort"})} />
        <CodeInstrument key="if" title="if" type="NEW COMMAND" dragStart={(newIdCmd, newIdCond)=>dispatchCode({type: "cmdInsertBegin", dragCode: {type: "if", cond: {val: "empty", id: newIdCond}, code: [], id: newIdCmd }})} dragAbort={()=>dispatchCode({type: "cmdAbort"})} />
        <CodeInstrument key="loop" title="loop" type="NEW COMMAND" dragStart={(newIdCmd, newIdCond)=>dispatchCode({type: "cmdInsertBegin", dragCode: {type: "loop", cond: {val: "empty", id: newIdCond}, code: [], id: newIdCmd }})} dragAbort={()=>dispatchCode({type: "cmdAbort"})} />
        <CodeInstrument key="call" title="call" type="NEW COMMAND" dragStart={(newId)=>dispatchCode({type: "cmdInsertBegin", dragCode: {type: "call", src: null, id: newId }})} dragAbort={()=>dispatchCode({type: "cmdAbort"})} />
        
        <CodeInstrument key="north free" title="north free" type="NEW CONDITION" dragStart={(newId)=>dispatchCode({type: "condInsertBegin", dragCode: {val: "north", id: newId }})} dragAbort={()=>dispatchCode({type: "condAbort"})} />
        <CodeInstrument key="south free" title="south free" type="NEW CONDITION" dragStart={(newId)=>dispatchCode({type: "condInsertBegin", dragCode: {val: "south", id: newId }})} dragAbort={()=>dispatchCode({type: "condAbort"})} />
        <CodeInstrument key="east free" title="east free" type="NEW CONDITION" dragStart={(newId)=>dispatchCode({type: "condInsertBegin", dragCode: {val: "east", id: newId }})} dragAbort={()=>dispatchCode({type: "condAbort"})} />
        <CodeInstrument key="west free" title="west free" type="NEW CONDITION" dragStart={(newId)=>dispatchCode({type: "condInsertBegin", dragCode: {val: "west", id: newId }})} dragAbort={()=>dispatchCode({type: "condAbort"})} />
        <CodeInstrument key="not" title="not" type="NEW CONDITION" dragStart={(newId, newIdRight)=>dispatchCode({type: "condInsertBegin", dragCode: {val: "not", id: newId, right: {val: "empty", id: newIdRight} }})} dragAbort={()=>dispatchCode({type: "condAbort"})} />
        <CodeInstrument key="and" title="and" type="NEW CONDITION" dragStart={(newId, newIdLeft, newIdRight)=>dispatchCode({type: "condInsertBegin", dragCode:  {val: "and", id: newId, left: {val: "empty", id: newIdLeft}, right: {val: "empty", id: newIdRight} }})} dragAbort={()=>dispatchCode({type: "condAbort"})} />
        <CodeInstrument key="or" title="or" type="NEW CONDITION" dragStart={(newId, newIdLeft, newIdRight)=>dispatchCode({type: "condInsertBegin", dragCode:  {val: "or", id: newId, left: {val: "empty", id: newIdLeft}, right: {val: "empty", id: newIdRight} }})} dragAbort={()=>dispatchCode({type: "condAbort"})} />
        
        <Dustbin dropCmd={() => dispatchCode({type: "cmdMoveTrash"})} />
      </div>
    </div>
  );
}

export default CodeDesk;