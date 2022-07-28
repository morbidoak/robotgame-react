import { useDrag } from 'react-dnd';
import { connect } from 'react-redux';

const BOARD_OFFSET_X = 8;
const BOARD_OFFSET_Y = 8;
const BOARD_CELL_WIDTH = 44;
const BOARD_CELL_HEIGHT = 44;

const mapStateToProps = (state, ownProps) => ({
  cordX:  (ownProps.game.tick > -1)?ownProps.game.log[ownProps.game.step].x:state.field.robot.x,
  cordY:  (ownProps.game.tick > -1)?ownProps.game.log[ownProps.game.step].y:state.field.robot.y,
});

const Robot = connect(mapStateToProps, null)(({game, cordX, cordY}) => {

  const [{ isDragging }, drag] = useDrag({
    type: "ROBOT",
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div 
      ref={drag} 
      className="robot robot-n" 
      style={{
        top: (BOARD_OFFSET_Y + BOARD_CELL_HEIGHT*cordY)+"px",
        left: (BOARD_OFFSET_X + BOARD_CELL_WIDTH*cordX)+"px",
        zIndex: 10 + cordY*3 + 2
      }}>
    </div>
  )
});

export default Robot;