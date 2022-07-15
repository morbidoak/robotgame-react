import {useDrag} from 'react-dnd';
import {useEffect} from 'react';
import {nanoid} from 'nanoid';

function CodeInstrument({title, type, dragStart, dragAbort}) {
  const [{ isDragging }, drag] = useDrag({
    type: type,
    end: () => dragAbort(),
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      dragStart(nanoid(), nanoid(), nanoid());
    }
  }, [isDragging]);

  return (<div ref={drag} className="codeInstrument">{title}</div>);
}

export default CodeInstrument;