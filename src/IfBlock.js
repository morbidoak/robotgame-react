import CodeBlock from "./CodeBlock";
import Condition from "./Condition";
import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { moveCommand, releaseCommand } from './RoboProgramStore/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  dragStart: () => dispatch(moveCommand(ownProps.code)),
  dragAbort: () => dispatch(releaseCommand()),
});

const IfBlock = connect(null, mapDispatchToProps)(({code, dragStart, dragAbort}) => {
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

  return (
    <div className="ifBlock">
      <div ref={drag} className="ifTitle">
        IF
        <Condition code={code.cond} />
      </div>
      <CodeBlock code={code.code} />
    </div>
  );

});

export default IfBlock;