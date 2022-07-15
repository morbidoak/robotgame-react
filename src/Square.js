import { useState, useEffect } from 'react';

function isPaint(x, y, paints) {
  return paints.some(cords => ((cords.x===x) && (cords.y===y)));
}

function isRobot(x, y, pos) {
    return (x===pos.x) && (y===pos.y);
}

function Square({x, y, game, field}) {
  return (
    <div className="square" style={{backgroundColor: isPaint(x, y, (game.tick > -1)?(game.paints):(field.paints))?"yellow":"white"}}>
      {isRobot(x, y, (game.tick > -1)?(game.log[game.step]):(field.robot))&&<div>R</div>}
    </div>
  )
}

export default Square;