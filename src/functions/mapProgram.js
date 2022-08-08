import { nanoid } from 'nanoid';

export default function mapProgram(code, func=null, params={}, level="program") {
  switch (level) {
    case "program": {
      let result = [];
      code.forEach(procedure => {
        if ((func !== "DELETE_PROCEDURE")||(procedure.id !== params.deleteId)) {
          let newTitle = procedure.title;
          if ((func === "RENAME_PROCEDURE")&&(procedure.id === params.renameId)) {
            newTitle = params.newTitle;
          }
          result.push({title: newTitle, id: procedure.id, code: mapProgram(procedure.code, func, params, "procedure"),});
        }
      });
      if (func === "ADD_PROCEDURE") {
        result.push({title: params.newTitle, id: nanoid(), code:[]});
      }
      return result;
    }

    case "procedure": {
      let result = [];
      if ((func === "ADD_INSERTERS")&&((code.length === 0) || (code[0].id !== params.avoidId))) {
        result.push({type: "insert", id: nanoid()});
      }
      for (let i=0; i<code.length; i++) {
        if (!((func === "DELETE_COMMAND")&&(code[i].id === params.deleteId)) && !((func === "DELETE_INSERTERS")&&(code[i].type === "insert"))) {
          if ((func === "INSERT_COMMAND")&&(code[i].id === params.insertId)) {
            result.push(params.command);
          } else {
            let item = {...code[i]}
            if ("code" in code[i]) {
              if ((func === "ADD_INSERTERS")&&(code[i].id === params.avoidId)) {
                item.code = mapProgram(code[i].code, "", "", "procedure");
              } else {
                item.code = mapProgram(code[i].code, func, params, "procedure");
              }
            }
            if ("cond" in code[i]) {
              item.cond = mapProgram(code[i].cond, func, params, "condition");
            }
            if ((func === "PROCEDURE_SET")&&(code[i].id === params.callId)) item.src = params.procedureId;
            if ((func === "DELETE_PROCEDURE")&&(code[i].src === params.deleteId)) item.src = "";
            result.push(item);

            if ((func === "ADD_INSERTERS")&&(code[i].id !== params.avoidId)) {
              result.push({type: "insert", id: nanoid()});
            }
          }
        }
      }
      return result;
    }

    case "condition": {
      if (code === null) return null;

      if (func==="INSERT_CONDITION" && code.id === params.dropId) {
        if (params.condition.val === "not" && params.condition.right.val === "empty") {
          let newCondition = mapProgram(params.condition, null, {}, "condition");
          newCondition.right = code;
          return newCondition;
        }
        if ((params.condition.val === "and" || params.condition.val === "or") && params.condition.left.val === "empty") {
          let newCondition = mapProgram(params.condition, null, {}, "condition");
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
        result.left = mapProgram(code.left, func, {...params, parentDrop:result.drop}, "condition");
        result.right = mapProgram(code.right, func, {...params, parentDrop:result.drop}, "condition");
      } else {
        result.left = mapProgram(code.left, func, params, "condition");
        result.right = mapProgram(code.right, func, params, "condition");
      }

      return result;
    }
  }
}
