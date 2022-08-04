import '../styles/Board.css';
import CrossWall from './CrossWall.js';
import HorizontalWall from './HorizontalWall.js';
import VerticalWall from './VerticalWall.js';
import Square from './Square.js';
import Robot from './Robot.js';
import { connect } from 'react-redux';
import { useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { BOARD_WIDTH, BOARD_HEIGHT, TICK_TIME } from '../config.js'
import { playStep, playX1, playX3, stop, pause, tick } from '../RoboProgramStore/actions.js';

const mapStateToProps = (state) => ({
  field: state.field,
  procedures: state.program.procedures,
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  playStep: (field, procedures) => dispatch(playStep(field, procedures)),
  playX1: (field, procedures) => dispatch(playX1(field, procedures)),
  playX3: (field, procedures) => dispatch(playX3(field, procedures)),
  stop: (field, procedures) => dispatch(stop(field, procedures)),
  pause: () => dispatch(pause()),
  tick: () => dispatch(tick()),
});

const Board = connect(mapStateToProps, mapDispatchToProps)(({field, procedures, game, playStep, playX1, playX3, stop, pause, tick}) => {
  const { t, i18n } = useTranslation();

  const tickerRef = useRef(0);

  useEffect(() => {
    if (game.play === "play-step" || game.play === "play-x1" || game.play === "play-x3") {
      const tickTime = (game.play === "play-x3")?(TICK_TIME/3):TICK_TIME;
      tick();
      tickerRef.current = setInterval(() => tick(), tickTime);
      return () => {
        clearInterval(tickerRef.current);
        tickerRef.current = 0;
      }
    }
  }, [game.play]);

  let boardParts = [];
  for (let j=0; j<=BOARD_HEIGHT; j++) {
    for (let i=0; i<=BOARD_WIDTH; i++) {
      boardParts.push(<CrossWall key={`cw-${j}-${i}`} x={i} y={j} />);
      if (i!==BOARD_WIDTH) boardParts.push(<HorizontalWall key={`hw-${j}-${i}`} x={i} y={j} />);
    }
    if (j!==BOARD_HEIGHT) {
      for (let i=0; i<=BOARD_WIDTH; i++) {
        boardParts.push(<VerticalWall key={`vw-${j}-${i}`} x={i} y={j} />);
        if (i!==BOARD_WIDTH) boardParts.push(<Square key={`sq-${j}-${i}`} x={i} y={j} />);
      }
    }
  }

  return (<>
    <div className="control-pannel">
      <span>
        {`${t("status.robot")} `} 
        {(game.play==="stop") && t("status.ready")}
        {(game.play === "play-step" || game.play === "play-x1" || game.play === "play-x3") && t("status.atwork")}
        {(game.play==="pause") && t("status.pause")}
        {(game.play==="finish") && (game.error?t("status.broken"):t("status.finish"))}
        {((game.play!=="stop") && (
          (game.workflow[game.step].start.x < 0) ||
          (game.workflow[game.step].start.x >= BOARD_WIDTH) ||
          (game.workflow[game.step].start.y < 0) ||
          (game.workflow[game.step].start.y >= BOARD_HEIGHT)
          )) && ` ${t("status.outside")}`}
      </span>
      <button className="stop" onClick={() => stop(field, procedures)}></button>
      <button className="pause" onClick={() => pause()}></button>
      <button className="play-step" onClick={() => playStep(field, procedures)}></button>
      <button className="play-x1" onClick={() => playX1(field, procedures)}></button>
      <button className="play-x3" onClick={() => playX3(field, procedures)}></button>
    </div>
    <div className="board">
      <div className="board-inside">
        <Robot />
        {boardParts}
      </div>
    </div>  
    </>);
});

export default Board;