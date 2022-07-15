import {useDrag} from 'react-dnd';
import {useEffect} from 'react';

function Command({cmd, dragStart, dragAbort}) {
  const [{ isDragging }, drag] = useDrag({
    type: 'MOVE COMMAND',
    end: () => dragAbort(),
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      dragStart();
    }
  }, [isDragging]);

  return (<div ref={drag} className="command">{cmd}</div>);
}

export default Command;