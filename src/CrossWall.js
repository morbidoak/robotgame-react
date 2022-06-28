function CrossWall({x, y, isWall}) {
  return (<div className="crossWall" style={{backgroundColor: isWall?"grey":"white"}}></div>)
}

export default CrossWall;