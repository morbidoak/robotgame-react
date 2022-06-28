import './App.css';
import React, {useState} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Board from'./Board.js'
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
      {type: "loop", cond:"s", code:[{type:"move", to: "north"}]}
    ]
  }
}


let gameLog = executeRoboProgram(testGame.procedures, testGame.field, 100);
console.log(gameLog);

//////

function App() {
  const BOARD_WIDTH = 10;
  const BOARD_HEIGHT = 10;

  const [gameInProgress, setGameInProgreess] = useState(0); // 0 - Sleep, 1 - In progress, 2 - Paused, 3 - Over

  function gameOver() {
    setGameInProgreess(3);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Board width={BOARD_WIDTH} height={BOARD_HEIGHT} field={testGame.field} log={gameLog} gameInProgress={gameInProgress} gameOver={gameOver} />
      <button value="Play" onClick={() => setGameInProgreess(1)} />
      <button value="Pause" onClick={() => setGameInProgreess(2)} />
      <button value="Stop" onClick={() => setGameInProgreess(0)} />
      <button value="Skip" onClick={() => setGameInProgreess(3)} />
    </DndProvider>
  );
}

export default App;
