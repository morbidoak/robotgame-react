import CodeBlock from "./CodeBlock";
import Condition from "./Condition";
import {useDrag} from 'react-dnd';
import {useEffect} from 'react';

function IfBlock({code, dispatchCode}) {
  const [{ isDragging }, drag] = useDrag({
    type: 'MOVE COMMAND',
    end: () => dispatchCode({type: "cmdAbort"}),
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      dispatchCode({type: "cmdMoveBegin", dragCode: code, dragId:code.id});
    }
  }, [isDragging]);

  return (
    <div className="ifBlock">
      <div ref={drag} className="ifTitle">
        IF
        <Condition code={code.cond} dispatchCode={dispatchCode} />
      </div>
      <CodeBlock code={code.code} dispatchCode={dispatchCode} />
    </div>
  );

}

export default IfBlock;