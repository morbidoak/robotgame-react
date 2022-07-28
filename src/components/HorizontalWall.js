import { connect } from 'react-redux';
import { addHorizontalWall, removeHorizontalWall } from "../RoboProgramStore/actions";

const mapStateToProps = (state, ownProps) => ({
  isWall: state.field.hWalls.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y))),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addWall: () => dispatch(addHorizontalWall(ownProps.x, ownProps.y)),
  deleteWall: () => dispatch(removeHorizontalWall(ownProps.x, ownProps.y)),
});

const HorizontalWall = connect(mapStateToProps, mapDispatchToProps)(({x, y, isWall, addWall, deleteWall}) => {
  return (<div className={("wall h-wall"+(isWall?" occupied":""))} onClick={() => (isWall?deleteWall():addWall())} style={{zIndex: 10+y*3}}></div>)
});

export default HorizontalWall;