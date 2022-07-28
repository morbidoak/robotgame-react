import '../styles/Board.css';
import CrossWall from './CrossWall.js';
import HorizontalWall from './HorizontalWall.js';
import VerticalWall from './VerticalWall.js';
import Square from './Square.js';
import Robot from './Robot.js';
import { connect } from 'react-redux';
import { useReducer, useEffect, useRef} from 'react';
import { useDrag } from 'react-dnd';
import executeRoboProgram from '../RoboProgram';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 14;
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

  let boardParts = [];
  for (let j=0; j<=BOARD_HEIGHT; j++) {
    for (let i=0; i<=BOARD_WIDTH; i++) {
      boardParts.push(<CrossWall key={`cw-${j}-${i}`} x={i} y={j} />);
      if (i!==BOARD_WIDTH) boardParts.push(<HorizontalWall key={`hw-${j}-${i}`} x={i} y={j} />);
    }
    if (j!==BOARD_HEIGHT) {
      for (let i=0; i<=BOARD_WIDTH; i++) {
        boardParts.push(<VerticalWall key={`vw-${j}-${i}`} x={i} y={j} />);
        if (i!==BOARD_WIDTH) boardParts.push(<Square key={`sq-${j}-${i}`} x={i} y={j} game={game} field={field} />);
      }
    }
  }

  return (<>
    <div className="control-pannel">
      <span>Робот: Готов tick: {game.tick}, step: {game.step}</span>
      <button className="stop" onClick={() => dispatchGame({type: "reset", field: field, log: log})}></button>
      <button className="pause" onClick={() => dispatchGame({type: "pause"})}></button>
      <button className="play" onClick={() => dispatchGame({type: "play"})}></button>
    </div>
    <div className="board">
      <div className="board-inside">
        <Robot game={game} field={field} />
        {boardParts}
      </div>
    </div>  
    </>);
});

export default Board;