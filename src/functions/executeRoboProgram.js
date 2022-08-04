function executeRoboProgram (procedures, field, stepLimit) {
    // let procedures = [{id:"werw", title:"wer", code:[]}, {id:"ert", title:"fgb", code:[]}];
    // let field = {"start":{x:0,y:0}, "hWalls":[], "vWalls":[], "paints":[]};

  function condition(cond) {

      if (cond.val ==="empty") {
        return true;
      }

      if (cond.val==="north") {
          if (field.hWalls.some(cords => ((cords.x===currentPosition.x) && (cords.y===currentPosition.y))))
              return false;
          else 
              return true;
      }
      if (cond.val==="south") {
          if (field.hWalls.some(cords => ((cords.x===currentPosition.x) && (cords.y===currentPosition.y+1))))
              return false;
          else
              return true;
      }
      if (cond.val==="west") {
          if (field.vWalls.some(cords => ((cords.x===currentPosition.x) && (cords.y===currentPosition.y))))
              return false;
          else
              return true;
      }
      if (cond.val==="east") {
          if (field.vWalls.some(cords => ((cords.x===currentPosition.x+1) && (cords.y===currentPosition.y))))
              return false;
          else
              return true;
      }

      if (cond.val==="paint") {
          if (currentPaints.some(cords => ((cords.x===currentPosition.x) && (cords.y===currentPosition.y))))
              return true;
          else 
              return false;
      }

    if (cond.val==="and") 
        return condition(cond.left) && condition(cond.right);

    if (cond.val==="or") 
        return condition(cond.left) || condition(cond.right);
      
     if (cond.val==="not") 
        return !condition(cond.right);
      
      return false;
  }

  function loop(cond, code) {
      if (!isError() && condition(cond)) {
          execute(code);
          loop(cond, code);
      } else return;
  }

  function move(to, cmdId) {
    let newStep = {};
    newStep.start = {x:currentPosition.x, y:currentPosition.y};
    newStep.id = cmdId;
    newStep.action = to;
    if (to === "paint") {
        if (!condition({val:"paint"})) currentPaints.push({x:currentPosition.x, y:currentPosition.y});
    } else {
        if (!condition({val: to})) error=true;
        else {
            switch (to) {
                case "north": currentPosition.y -= 1; break;
                case "south": currentPosition.y += 1; break;
                case "west": currentPosition.x -= 1; break;
                case "east": currentPosition.x += 1; break;
                default: break;
            }
        }
    }
    newStep.end = {x:currentPosition.x, y:currentPosition.y};
    newStep.error = isError();
    workflow.push(newStep);
  }

  function execute(code) {
    for (let i=0; i<code.length; i++) {
        if (isError()) break;

        if (code[i].type === "move") move(code[i].to, code[i].id);
        if (code[i].type === "if") if (condition(code[i].cond)) execute(code[i].code);
        if (code[i].type === "loop") loop(code[i].cond, code[i].code);
        if (code[i].type === "call") {
            if (code[i].src !== "") {
                let callIndex = procedures.findIndex(({ id }) => ( id === code[i].src ));
                if (callIndex>=0) execute(procedures[callIndex].code);
            }
        }

        step += 1;
    }
  }

  function isError() {return error || step>=stepLimit}

  let currentPosition = {x:field.robot.x, y:field.robot.y};
  let currentPaints = [...field.paints];
  let error = false;
  let step = 0;
  let workflow = [];
  
  execute(procedures[0].code);

  return workflow;
}

export default executeRoboProgram;