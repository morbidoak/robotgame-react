import CrossWall from './CrossWall.js'
import HorizontalWall from './HorizontalWall.js'
import VerticalWall from './VerticalWall.js'
import Square from './Square.js'
import { useReducer, useEffect, useState } from 'react';

const TURN_SPEED = 1000; //ms in turn
const TURN_DELAY = 500; //ms between turns
const TURN_TICKS = 20; //ticks in turn (smoothness)
const TURN_DELAY_TICKS = TURN_DELAY*TURN_TICKS/TURN_SPEED; //ticks between turns

function gameReducer(state, action) {
  switch (action.type) {
    case "drop":

    case "tick":
      if (state.tick < TURN_TICKS+TURN_DELAY_TICKS) {
        return {
          ...state, 
          tick: state.tick+1
        };
      } else {
        if (state.step < state.gameLog.length) {
          let nextStep = state.step+1;
          return {
            ...state, 
            x: state.gameLog[nextStep].x,
            y: state.gameLog[nextStep].y,
            cond: `${state.gameLog[nextStep].cond}${(state.gameLog[nextStep].error&&"_error")}`,
            step: state.step+1, 
            tick: 0
          };
        }
      }

  }
}


function gameInit() {

}


function Board({width, height, field, log, gameInProgress, gameOver}) {

  const [game, dispatchGame] = useReducer(gameReducer, {x: field.start.x, y: field.start.y, cond: "sleep", paints: [...field.paints], gameLog:[...log], step:0, tick:0 });
  const tickerRef = useRef(0);

  useEffect(() => {
    if (gameInProgress === 0) {

    }
    if (gameInProgress === 1) {

    }
  }, [gameInProgress]);

  useEffect(() => {
    if (gameInProgress === 1) {
      makeMove();
    }
  }, [tick]);

  useEffect(() => {
    if (gameInProgress === 1) {
      setRobot({x: log[step].x, y: log[step].y, cond: `${log[step].cond}${(log[step].error&&"_error")}`});
      setTick(0); 
    }
  }, [step]);

  function makeMove() {
    if (tick < TURN_SMOOTHNESS) {
      setTimeout(()=>setTick(tick + 1), TURN_SPEED/TURN_SMOOTHNESS);
    } else {
      if (step === log.length-1) {
        gameOver();
      } else {
        setTimeout(()=>setStep(step+1), TURN_DELAY);
      }
    }
  }

  function isWall(type, x, y) {
    if (type==="h") return field.hWalls.some(cords => ((cords.x===x) && (cords.y===y)));
    if (type==="v") return field.vWalls.some(cords => ((cords.x===x) && (cords.y===y)));
    if (type==="c") return 
      (field.hWalls.some(cords => ((cords.x===x) && (cords.y===y)) || ((cords.x-1===x) && (cords.y===y)) ))
      || (field.vWalls.some(cords => ((cords.x===x) && (cords.y===y)) || ((cords.x-1===x) && (cords.y===y)) ));
    
    return false;
  }

  function renderWallRow(rowNum) {
    let result = [];
    for (let i=0; i<=width; i++) {
      result.push(<CrossWall key={`cw_${i}_${rowNum}`} x={i} y={rowNum} isWall={() => isWall("c", i, rowNum)} />);
      if (i!==width) result.push(<HorizontalWall key={`hw_${i}_${rowNum}`} x={i} y={rowNum} isWall={() => isWall("h", i, rowNum)} />);
    }
    return (<div key={`wr_${rowNum}`} className="boardRow">{result}</div>);
  }

  function renderSquareRow(rowNum) {
    let result = [];
    for (let i=0; i<=width; i++) {
      result.push(<VerticalWall key={`vw_${i}_${rowNum}`} x={i} y={rowNum} isWall={() => isWall("v", i, rowNum)} />);
      if (i!==width) result.push(<Square key={`sq_${i}_${rowNum}`} x={i} y={rowNum} paints={paints} robot={robot} />);
    }
    return (<div key={`sr_${rowNum}`} className="boardRow">{result}</div>);
  }

  let boardLiver = [];
  for (let j=0; j<height; j++) {
    boardLiver.push(renderWallRow(j));
    boardLiver.push(renderSquareRow(j));
  }
  boardLiver.push(renderWallRow(height));

  return (<div className="board">{boardLiver}</div>);
}

export default Board;