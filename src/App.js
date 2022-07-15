import './App.css';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Board from'./Board.js'
import CodeDesk from'./CodeDesk.js'
import executeRoboProgram from './RoboProgram';

//////
const testGame = {
  field: {
    robot: {x:3, y:3},
    hWalls: [{x:3, y:1}],
    vWalls: [],
    paints: [],
  },

  procedures: {
    "_": [
      {type: "loop", cond:"south", code:[
        {type:"move", to: "north"}, 
        {type:"move", to: "paint"}
      ]}
    ]
  }
}


let gameLog = executeRoboProgram(testGame.procedures, testGame.field, 100);
//console.log(gameLog);

//////

function App() {
  const BOARD_WIDTH = 10;
  const BOARD_HEIGHT = 10;

  return (
    <>
    <Board width={BOARD_WIDTH} height={BOARD_HEIGHT} field={testGame.field} log={gameLog} />
    <DndProvider backend={HTML5Backend}>
      <CodeDesk />
    </DndProvider>
    </>
  );
}

export default App;
