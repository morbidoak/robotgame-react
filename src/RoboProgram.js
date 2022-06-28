function executeRoboProgram (procedures, field, stepLimit) {
    // let procedures = {"_":[]};
    // let field = {"start":{x:0,y:0}, "hWalls":[], "vWalls":[], "paints":[]};

  function condition(cond) {
      if (cond==="north") {
          if (field.hWalls.some(cords => ((cords.x===currentPosition.x) && (cords.y===currentPosition.y))))
              return false;
          else 
              return true;
      }
      if (cond==="south") {
          if (field.hWalls.some(cords => ((cords.x===currentPosition.x) && (cords.y===currentPosition.y+1))))
              return false;
          else
              return true;
      }
      if (cond==="west") {
          if (field.vWalls.some(cords => ((cords.x===currentPosition.x) && (cords.y===currentPosition.y))))
              return false;
          else
              return true;
      }
      if (cond==="east") {
          if (field.vWalls.some(cords => ((cords.x===currentPosition.x+1) && (cords.y===currentPosition.y))))
              return false;
          else
              return true;
      }

      if (cond==="paint") {
          if (currentPaints.some(cords => ((cords.x===currentPosition.x) && (cords.y===currentPosition.y))))
              return false;
          else 
              return true;
      }

      if (cond.op==="and") 
          return condition(cond.left) && condition(cond.right);

      if (cond.op==="or") 
          return condition(cond.left) || condition(cond.right);
      
      if (cond.op==="not") 
          return !condition(cond.right);
      
      return false;
  }

  function loop(cond, code) {
      if (!isError() && condition(cond)) {
          execute(code);
          loop(cond, code);
      } else return;
  }

  function move(to) {
    if (to === "paint") {
        if (!condition("paint")) currentPaints.append({x:currentPosition.x, y:currentPosition.y});
    } else {
        if (!condition(to)) error=true;
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
    workflow[step] = {"action":to, "x":currentPosition.x, "y":currentPosition.y, "error":isError()};
    console.log(workflow[step]);
  }

  function execute(code) {
    for (let i=0; i<code.length; i++) {
        if (isError()) break;

        if (code[i].type === "move") move(code[i].to);
        if (code[i].type === "if") if (condition(code[i].cond)) execute(code[i].code);
        if (code[i].type === "loop") loop(code[i].cond, code[i].code);
        if (code[i].type === "call") execute(procedures[code[i].src]);

        step += 1;
    }
  }

  function isError() {return error || step>=stepLimit}

  let currentPosition = {x:field.robot.x, y:field.robot.y};
  let currentPaints = [...field.paints];
  let error = false;
  let step = 0;
  let workflow = [];
  
  execute(procedures["_"]);

  return workflow;
}

export default executeRoboProgram;