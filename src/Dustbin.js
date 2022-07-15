import {useDrop} from 'react-dnd';

function Dustbin({dropCmd}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "MOVE COMMAND",
    drop: () => dropCmd(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (<div ref={drop} className="dustbin">{(isOver?">REMOVE<":"Dustbin")}</div>);
}

export default Dustbin;