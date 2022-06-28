function VerticalWall({x, y, isWall}) {
  return (<div className="verticalWall" style={{backgroundColor: isWall?"grey":"white"}}></div>)
}

export default VerticalWall;