import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import { moveRobot, addPaint, removePaint } from "../RoboProgramStore/actions";

const mapStateToProps = (state, ownProps) => ({
  isPaint: (ownProps.game.tick > -1)?
    (ownProps.game.paints.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y)))):
    (state.field.paints.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y)))),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPaint: () => dispatch(addPaint(ownProps.x, ownProps.y)),
  deletePaint: () => dispatch(removePaint(ownProps.x, ownProps.y)),
  dropRobot: () => dispatch(moveRobot(ownProps.x, ownProps.y)),
});

const Square = connect(mapStateToProps, mapDispatchToProps)(({x, y, game, isPaint, addPaint, deletePaint, dropRobot}) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ROBOT",
    drop: () => dropRobot(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={"square"+(isPaint?" painted":"")} onClick={()=>(isPaint?deletePaint():addPaint())}>

    </div>
  )
});

export default Square;