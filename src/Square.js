function Square({x, y, isPaint, isRobot}) {
  return (<div className="square" style={{backgroundColor: isPaint?"yellow":"white"}}>{isRobot&&<span>R</span>}</div>)
}

export default Square;