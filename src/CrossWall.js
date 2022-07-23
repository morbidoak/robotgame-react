import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  isWall: (state.field.hWalls.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y)) || ((cords.x+1===ownProps.x) && (cords.y===ownProps.y)) ))
  || (state.field.vWalls.some(cords => ((cords.x===ownProps.x) && (cords.y===ownProps.y)) || ((cords.x===ownProps.x) && (cords.y+1===ownProps.y)) ))
});

const CrossWall = connect(mapStateToProps, null)(({x, y, isWall}) => {
  return (<div className="crossWall" style={{backgroundColor: isWall?"grey":"white"}}></div>)
});

export default CrossWall;