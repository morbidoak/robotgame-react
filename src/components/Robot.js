import { useDrag } from 'react-dnd';
import { connect } from 'react-redux';
import { BOARD_OFFSET_X, BOARD_OFFSET_Y, BOARD_CELL_WIDTH, BOARD_CELL_HEIGHT, MOVE_LENGTH_WIDTH, MOVE_LENGTH_HEIGHT } from '../config.js';

const mapStateToProps = (state) => {
  const tick = state.game.tick;
  const step = state.game.step;
  const workflow = state.game.workflow;
  const behavour = state.game.behavour;
  const play = state.game.play;

  let cordX = (play!=="stop")?workflow[step].start.x:state.field.robot.x;
  let cordY = (play!=="stop")?workflow[step].start.y:state.field.robot.y;

  let top = BOARD_OFFSET_Y + BOARD_CELL_HEIGHT*cordY;
  let left = BOARD_OFFSET_X + BOARD_CELL_WIDTH*cordX;
  let direction = "s";

  if (play!=="stop") {
    direction = behavour[tick];
    
    for (let i=1; i<=tick; i++) {
      if (behavour[i] === behavour[i-1]) {
        switch (behavour[tick]) {
          case "n":
            top -= MOVE_LENGTH_HEIGHT;
            break;
          case "s":
            top += MOVE_LENGTH_HEIGHT;
            break;
          case "w":
            left -= MOVE_LENGTH_WIDTH;
            break;
          case "e":
            left += MOVE_LENGTH_WIDTH;
            break;
          default:
            break;
        }
      }
    }
  }
  return {cordX, cordY, top, left, direction}
};

const Robot = connect(mapStateToProps, null)(({cordX, cordY, top, left, direction}) => {

  const [{ isDragging }, drag] = useDrag({
    type: "ROBOT",
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div 
      ref={drag} 
      className={`robot robot-${direction}`} 
      style={{
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 10 + cordY*3 + 2
      }}>
    </div>
  )
});

export default Robot;