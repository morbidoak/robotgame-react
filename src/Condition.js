import {useDrag, useDrop} from 'react-dnd';
import {useEffect} from 'react';

function Condition({code, dispatchCode}) {
  const [{ isDragging }, drag] = useDrag({
    type: 'MOVE CONDITION',
    end: () => dispatchCode({type: "condAbort"}),
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["MOVE CONDITION", "NEW CONDITION"],
    drop: () => dispatchCode({type: "condRelease", dropId: code.id}),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (isDragging) {
      dispatchCode({type: "condMoveBegin", dragCode: code, dragId:code.id});
    }
  }, [isDragging]);

  return (
    <div ref={(("drop" in code) && code.drop)?drop:drag} className={`condition`}>
      {("left" in code)&&(<Condition code={code.left} dispatchCode={dispatchCode} />)}
      {code.val}
      {("right" in code)&&(<Condition code={code.right} dispatchCode={dispatchCode} />)}
    </div>
  );
}

export default Condition;