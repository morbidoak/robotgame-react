function test() {
  console.log("test run");
  let game = {
    field: {
      start: {x:3, y:3},
      hWalls: [{x:3, y:1}],
      vWalls: [],
      paints: [],
    },

    procedures: {
      "_": [
        {type: "loop", cond:"s", code:[{type:"move", to: "n"}]}
      ]
    }
  }


  let result = executeRoboProgram(game.procedures, game.field, 100);
  console.log(result);
}