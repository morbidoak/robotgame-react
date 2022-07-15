import {useDrop} from 'react-dnd';
import {useEffect} from 'react';

function InsertArea({dropCmd}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["MOVE COMMAND", "NEW COMMAND"],
    drop: () => dropCmd(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (<div ref={drop} className="insertArea">{(isOver&&"-------------------")}</div>);
}

export default InsertArea;