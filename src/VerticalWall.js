import { connect } from 'react-redux';
import { addVerticalWall, removeVerticalWall } from "./RoboProgramStore/actions";

const mapStateToProps = (state, ownProps) => ({
  isWall: state.field.vWalls.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y))),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addWall: () => dispatch(addVerticalWall(ownProps.x, ownProps.y)),
  deleteWall: () => dispatch(removeVerticalWall(ownProps.x, ownProps.y)),
});

const VerticalWall = connect(mapStateToProps, mapDispatchToProps)(({x, y, isWall, addWall, deleteWall}) => {
  return (<div className="verticalWall" onClick={() => (isWall?deleteWall():addWall())} style={{backgroundColor: isWall?"grey":"white"}}></div>)
});

export default VerticalWall;