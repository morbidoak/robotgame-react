import { useDrag, useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import { moveRobot, addPaint, removePaint } from "./RoboProgramStore/actions";

const mapStateToProps = (state, ownProps) => ({
  isPaint: (ownProps.game.tick > -1)?
    (ownProps.game.paints.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y)))):
    (state.field.paints.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y)))),
  
  isRobot: (ownProps.game.tick > -1)?
    ((ownProps.x===ownProps.game.log[ownProps.game.step].x) && (ownProps.y===ownProps.game.log[ownProps.game.step].y)):
    ((ownProps.x===state.field.robot.x) && (ownProps.y===state.field.robot.y))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPaint: () => dispatch(addPaint(ownProps.x, ownProps.y)),
  deletePaint: () => dispatch(removePaint(ownProps.x, ownProps.y)),
  dropRobot: () => dispatch(moveRobot(ownProps.x, ownProps.y)),
});

const Square = connect(mapStateToProps, mapDispatchToProps)(({x, y, game, isPaint, isRobot, addPaint, deletePaint, dropRobot}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ROBOT",
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ROBOT",
    drop: () => dropRobot(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="square" onClick={()=>(isPaint?deletePaint():addPaint())} style={{backgroundColor:isPaint?"yellow":"white"}}>
      {isRobot&&(<div ref={drag}>R</div>)}
    </div>
  )
});

export default Square;