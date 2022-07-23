import { connect } from 'react-redux';
import { addHorizontalWall, removeHorizontalWall } from "./RoboProgramStore/actions";

const mapStateToProps = (state, ownProps) => ({
  isWall: state.field.hWalls.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y))),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addWall: () => dispatch(addHorizontalWall(ownProps.x, ownProps.y)),
  deleteWall: () => dispatch(removeHorizontalWall(ownProps.x, ownProps.y)),
});

const HorizontalWall = connect(mapStateToProps, mapDispatchToProps)(({x, y, isWall, addWall, deleteWall}) => {
  return (<div className="horizontalWall" onClick={() => (isWall?deleteWall():addWall())} style={{backgroundColor: isWall?"grey":"white"}}></div>)
});

export default HorizontalWall;