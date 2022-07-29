import '../styles/Board.css';
import CrossWall from './CrossWall.js';
import HorizontalWall from './HorizontalWall.js';
import VerticalWall from './VerticalWall.js';
import Square from './Square.js';
import Robot from './Robot.js';
import { connect } from 'react-redux';
import { useReducer, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import executeRoboProgram from '../RoboProgram.js';
import { BOARD_WIDTH, BOARD_HEIGHT, TURNS_LIMIT, MOVE_TICKS, TICK_TIME, STEERING_ACTIONS, PAINT_ACTIONS } from '../gameConfig.js'


function planBehavour(lastBehavour, newAction) {
  let result;
  if (newAction === "paint") {
    result = [...PAINT_ACTIONS[lastBehavour]];
  } else {
    result = [...STEERING_ACTIONS[lastBehavour][newAction[0]], ...Array(MOVE_TICKS).fill(newAction[0])];
  }
  return result;
}

function gameReducer(state, action) {
  switch (action.type) {
    case "stop":
      return gameInit({field: action.field, workflow: action.workflow});

    case "tick":
      let play = "play";
      if ((state.tick === state.behavour.length-1)&&(state.step === state.workflow.length-1)) {
        play = "finish";
      }

      let tick = state.tick;
      if ((state.tick !== state.behavour.length-1)&&(play === "play")) {
        tick = state.tick+1;
      }

      let paints = [...state.paints];
      if ((state.tick === state.behavour.length-1)&&(state.workflow[state.step].action === "paint")) {
        paints.push({x: state.workflow[state.step].start.x, y: state.workflow[state.step].start.y});
      }

      let step = state.step;
      if ((state.tick === state.behavour.length-1) && (play === "play")) {
        step = state.step+1;
        tick = 0;
      }

      let error = state.workflow[step].error;

      let behavour = state.behavour;
      if ((tick === 0) && !error) {
        behavour = planBehavour(state.behavour.at(-1), state.workflow[step].action);
      }

      

      return {
        ...state,
        paints: paints, 
        step: step, 
        tick: tick,
        behavour: behavour,
        play: play,
        error: error
      }

    case "play": {
      if (state.play === "pause") {
        return {...state, play: "play"}
      } else {
        return {...gameInit({field: action.field, workflow: action.workflow}), play: "play"}
      }
    }

    case "pause":
      return {...state, play: "pause"}
  }
}

function gameInit({field, workflow}) {
  console.log(workflow);
  return {
    paints: [...field.paints], 
    workflow: [...workflow], 
    step: 0,
    tick: -1,
    behavour: ["s"], 
    play: "stop",
    error: false
  }
}

const mapStateToProps = (state) => ({
  field: state.field,
  workflow: executeRoboProgram(state.program.procedures, state.field, TURNS_LIMIT),
});

const Board = connect(mapStateToProps, null)(({field, workflow}) => {
  const { t, i18n } = useTranslation();

  const [game, dispatchGame] = useReducer(gameReducer, {field, workflow}, gameInit);
  const tickerRef = useRef(0);

  useEffect(() => {
    if (game.play === "play") {
      dispatchGame({type: 'tick'});
      tickerRef.current = setInterval(() => dispatchGame({type: 'tick'}), TICK_TIME);
      return () => {
        clearInterval(tickerRef.current);
        tickerRef.current = 0;
      }
    }
  }, [game.play, field, game.workflow]);

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
      <span>
        {`${t("status.robot")} `} 
        {(game.play==="stop") && t("status.ready")}
        {(game.play==="play") && t("status.atwork")}
        {(game.play==="pause") && t("status.pause")}
        {(game.play==="finish") && (game.error?t("status.broken"):t("status.finish"))}
        {((game.play!=="stop") && (
          (game.workflow[game.step].start.x < 0) ||
          (game.workflow[game.step].start.x >= BOARD_WIDTH) ||
          (game.workflow[game.step].start.y < 0) ||
          (game.workflow[game.step].start.y >= BOARD_HEIGHT)
          )) && ` ${t("status.outside")}`}
      </span>
      <button className="stop" onClick={() => dispatchGame({type: "stop", field: field, workflow: workflow})}></button>
      <button className="pause" onClick={() => dispatchGame({type: "pause"})}></button>
      <button className="play" onClick={() => dispatchGame({type: "play", field: field, workflow: workflow})}></button>
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