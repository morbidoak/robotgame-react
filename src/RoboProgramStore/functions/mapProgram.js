import { nanoid } from 'nanoid';

export function addInserters(code, avoid=0, level="program") {
  let result = [];
  if (level==="procedure") {
    if (code.length === 0) {
      result.push({type: "insert", id: nanoid()});
    } else {
      for (let i=0; i<code.length; i++) {
        if ((code[i].id !== avoid) && ((i===0) || (code[i-1].id !== avoid))) result.push({type: "insert", id: nanoid()});
        if (("code" in code[i]) && (code[i].id !== avoid)) {
          result.push({...code[i], code: addInserters(code[i].code, avoid, level)});
        } else {
          result.push({...code[i]});
        }
      }
      if (code[code.length-1].id !== avoid) result.push({type: "insert", id: nanoid()});
    }
  } else {
    code.forEach(procedure => {
      result.push({title: procedure.title, id: procedure.id, code: addInserters(procedure.code, avoid, "procedure"),});
    });
  }
  return result;
}

export function clearInserters(code, level="program") {
  let result = [];
  if (level==="procedure") {
    for (let i=0; i<code.length; i++) {
      if (code[i].type !== "insert") {
        if ("code" in code[i]) {
          result.push({...code[i], code: clearInserters(code[i].code, level)});
        } else {
          result.push({...code[i]});
        }
      }
    }
  } else {
    code.forEach(procedure => {
      result.push({title: procedure.title, id: procedure.id, code: clearInserters(procedure.code, "procedure"),});
    });
  }
  return result;
}

export function deleteCommand(code, commandId) {
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

export function insertCommand(code, inserterId, command) {
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


export function mapCode(code, func=null, params={}, level="program") {
  switch (level) {
    case "program": {
      let result = [];
      code.forEach(procedure => {
        if ((func !== "DELETE_PROCEDURE")||(procedure.id !== params.deleteId)) {
          let newTitle = procedure.title;
          if ((func === "RENAME_PROCEDURE")&&(procedure.id === params.renameId))
            newTitle = params.newTitle;

          result.push({title: newTitle, id: procedure.id, code: mapCode(procedure.code, func, params, "procedure"),});
        }
      });
      if (func === "ADD_PROCEDURE") {
        result.push({title: params.newTitle, id: nanoid(), code:[]});
      }
      return result;
    }

    case "procedure": {
      let result = [];
      for (let i=0; i<code.length; i++) {
        let item = {...code[i]}
        if ("code" in code[i]) item.code = mapCode(code[i].code, func, params, "procedure");
        if ("cond" in code[i]) item.cond = mapCode(code[i].cond, func, params, "condition");
        if ((func === "PROCEDURE_SET")&&(code[i].id === params.callId)) item.src = params.procedureId;
        if ((func === "DELETE_PROCEDURE")&&(code[i].src === params.deleteId)) item.src = "";
        result.push(item);
      }
      return result;
    }

    case "condition": {
      

      if (func==="INSERT_CONDITION" && code.id === params.dropId) {
        if (params.condition.val === "not" && params.condition.right.val === "empty") {
          let newCondition = mapCode(params.condition, null, {}, "condition");
          newCondition.right = code;
          return newCondition;
        }
        if ((params.condition.val === "and" || params.condition.val === "or") && params.condition.left.val === "empty") {
          let newCondition = mapCode(params.condition, null, {}, "condition");
          newCondition.left = code;
          return newCondition;
        }

        return params.condition;
      }

      if (func==="DELETE_CONDITION" && code.id === params.dropId) {
        return {val:"empty", id:nanoid(), left: null, right: null};
      }

      let result = {val:code.val, id:code.id};
      if (func==="MARK_DROP_CONDITION") {
        if (code.id === params.avoidId) {
          result.drop = false;
        } else {
          result.drop = params.parentDrop;
        }
        
        if (code.left !== null) result.left = mapCode(code.left, func, {...params, parentDrop:result.drop}, "condition");
        else result.left = null;

        if (code.right !== null) result.right = mapCode(code.right, func, {...params, parentDrop:result.drop}, "condition");
        else result.right = null;
      } else {
        if (code.left !== null) result.left = mapCode(code.left, func, params, "condition");
        else result.left = null;

        if (code.right !== null) result.right = mapCode(code.right, func, params, "condition");
        else result.right = null;
      }

      return result;
    }
  }
}

export function checkProcedureTitle(procedures, newTitle) {
  if (newTitle==="") return false;
  if (procedures.findIndex(({ title }) => (title === newTitle)) >= 0) return false;
  return true;
}

export function newProcedureTitle(procedures, baseTitle) {
  let i = 1;
  while (!checkProcedureTitle(procedures, `${baseTitle} ${i}`)) i++;
  return `${baseTitle} ${i}`;
}