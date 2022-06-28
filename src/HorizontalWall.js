function HorizontalWall({x, y, isWall}) {
  return (<div className="horizontalWall" style={{backgroundColor: isWall?"grey":"white"}}></div>)
}

export default HorizontalWall;