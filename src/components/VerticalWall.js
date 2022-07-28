import { connect } from 'react-redux';
import { addVerticalWall, removeVerticalWall } from "../RoboProgramStore/actions";

const mapStateToProps = (state, ownProps) => ({
  isWall: state.field.vWalls.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y))),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addWall: () => dispatch(addVerticalWall(ownProps.x, ownProps.y)),
  deleteWall: () => dispatch(removeVerticalWall(ownProps.x, ownProps.y)),
});

const VerticalWall = connect(mapStateToProps, mapDispatchToProps)(({x, y, isWall, addWall, deleteWall}) => {
  return (<div className={("wall v-wall"+(isWall?" occupied":""))} onClick={() => (isWall?deleteWall():addWall())} style={{zIndex: 10+y*3+1}}></div>)
});

export default VerticalWall;