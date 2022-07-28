import CodeBlock from "./CodeBlock";
import Condition from "./Condition";
import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { moveCommand, releaseCommand } from '../RoboProgramStore/actions';

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
    <div className="block-command">
      <div ref={drag} className="condition-block">
        <span>Если</span>
        <Condition code={code.cond} />
        <span>выполнить:</span>
      </div>
      <div className="command-block">
        <CodeBlock code={code.code} />
      </div>
    </div>
  );

});

export default IfBlock;