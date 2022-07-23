import CrossWall from './CrossWall.js'
import HorizontalWall from './HorizontalWall.js'
import VerticalWall from './VerticalWall.js'
import Square from './Square.js'
import { connect } from 'react-redux';
import { useReducer, useEffect, useRef} from 'react';
import executeRoboProgram from './RoboProgram';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;
const TURNS_LIMIT = 100; //maximum turns in log
const TURN_SPEED = 1000; //ms in turn
const TURN_DELAY = 500; //ms between turns
const TURN_TICKS = 20; //ticks in turn (smoothness)
const TURN_DELAY_TICKS = TURN_DELAY*TURN_TICKS/TURN_SPEED; //ticks between turns
const TICK_TIME = TURN_SPEED/TURN_TICKS; //ms in tick


function gameReducer(state, action) {
  switch (action.type) {
    case "reset":
      return gameInit({field: action.field, log: action.log});

    case "tick":
      let newTick = state.tick+1;
      let newStep = state.step;
      let newPlay = !((newStep >= state.log.length - 1)&&(newTick>=TURN_TICKS));
      let newPaints = [...state.paints];
      if (state.log[newStep].action === "paint") {
        newPaints.push({x: state.log[newStep].x, y: state.log[newStep].y});
      }
      if ((newTick >= TURN_TICKS+TURN_DELAY_TICKS) && newPlay) {
        newTick = 0;
        newStep = state.step+1;
      }  
      let newBehavour = state.log[newStep].action;
      let newError = state.log[newStep].error;
      if (state.tick >= TURN_TICKS) {
        newBehavour = (newError)?(state.behavour):"sleep";
      } 
      return {
        paints: newPaints, 
        log: [...state.log], 
        step: newStep, 
        tick: newTick,
        behavour: newBehavour,
        play: newPlay,
        error: newError
      }

    case "play":
      return {...state, play: true}

    case "replay":
      return {...gameInit({field: action.field, log: action.log}), play: true}

    case "pause":
      return {...state, play: false}
  }
}

function gameInit({field, log}) {
  return {
    paints: [...field.paints], 
    log: [...log], 
    step: 0,
    tick: -1,
    behavour: "sleep", 
    play: false,
    error: false
  }
}


const mapStateToProps = (state) => ({
  field: state.field,
  log: executeRoboProgram(state.program.procedures, state.field, TURNS_LIMIT),
});

const Board = connect(mapStateToProps, null)(({field, log}) => {
  const width = BOARD_WIDTH;
  const height = BOARD_HEIGHT;

  const [game, dispatchGame] = useReducer(gameReducer, {field, log}, gameInit);
  const tickerRef = useRef(0);

  useEffect(() => {
    if (game.play) {
      dispatchGame({type: 'tick'});
      tickerRef.current = setInterval(() => dispatchGame({type: 'tick'}), TICK_TIME);
      return () => {
        clearInterval(tickerRef.current);
        tickerRef.current = 0;
      }
    }
  }, [game.play, field, log]);


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
      result.push(<CrossWall key={`cw_${i}_${rowNum}`} x={i} y={rowNum} />);
      if (i!==width) result.push(<HorizontalWall key={`hw_${i}_${rowNum}`} x={i} y={rowNum} />);
    }
    return (<div key={`wr_${rowNum}`} className="boardRow">{result}</div>);
  }

  function renderSquareRow(rowNum) {
    let result = [];
    for (let i=0; i<=width; i++) {
      result.push(<VerticalWall key={`vw_${i}_${rowNum}`} x={i} y={rowNum} />);
      if (i!==width) result.push(<Square key={`sq_${i}_${rowNum}`} x={i} y={rowNum} game={game} field={field} />);
    }
    return (<div key={`sr_${rowNum}`} className="boardRow">{result}</div>);
  }

  let boardLiver = [];
  for (let j=0; j<height; j++) {
    boardLiver.push(renderWallRow(j));
    boardLiver.push(renderSquareRow(j));
  }
  boardLiver.push(renderWallRow(height));

  return (
    <div className="playDesk">
      <div className="board">{boardLiver}</div>
      <div>tick: {game.tick}, step: {game.step}</div>
      <button onClick={() => dispatchGame({type: "play"})}>Play</button>
      <button onClick={() => dispatchGame({type: "pause"})}>Pause</button>
      <button onClick={() => dispatchGame({type: "reset", field: field, log: log})}>Stop</button>
      <button onClick={() => dispatchGame({type: "replay", field: field, log: log})}>Replay</button>
    </div>);
});

export default Board;