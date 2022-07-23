import { useDrag, useDrop } from 'react-dnd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { moveCondition, releaseCondition, dropCondition } from './RoboProgramStore/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  dragStart: () => dispatch(moveCondition(ownProps.code)),
  dragAbort: () => dispatch(releaseCondition()),
  dropCond: () => dispatch(dropCondition(ownProps.code.id)),
});

const Condition = connect(null, mapDispatchToProps)(({code, dragStart, dragAbort, dropCond}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'MOVE CONDITION',
    end: () => dragAbort(),
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["MOVE CONDITION", "NEW CONDITION"],
    drop: () => dropCond(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [code]);

  useEffect(() => {
    if (isDragging) {
      dragStart();
    }
  }, [isDragging]);

  return (
    <div key={code.id} ref={drag} className={`condition`}>
      {(code.left !== null)&&(<Condition code={code.left} />)}
      {(("drop" in code) && code.drop)?(<span ref={drop}>{code.val}</span>):code.val}
      {(code.right !== null)&&(<Condition code={code.right}  />)}
    </div>
  );
});

export default Condition;