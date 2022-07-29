import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import { moveRobot, addPaint, removePaint } from "../RoboProgramStore/actions";

const mapStateToProps = (state, ownProps) => ({
  isPaint: (ownProps.game.tick > -1)?
    (ownProps.game.paints.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y)))):
    (state.field.paints.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y)))),
});

const mapDispatchToProps = (dispatch) => ({
  addPaint: (x, y) => dispatch(addPaint(x, y)),
  deletePaint: (x, y) => dispatch(removePaint(x, y)),
  dropRobot: (x, y) => dispatch(moveRobot(x, y)),
});

const Square = connect(mapStateToProps, mapDispatchToProps)(({x, y, game, isPaint, addPaint, deletePaint, dropRobot}) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ROBOT",
    drop: () => dropRobot(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [x, y]);

  return (
    <div ref={drop} className={"square"+(isPaint?" painted":"")} onClick={()=>(isPaint?deletePaint(x, y):addPaint(x, y))}>

    </div>
  )
});

export default Square;