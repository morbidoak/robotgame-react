import { useDrag, useDrop } from 'react-dnd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { moveCondition, releaseCondition, dropCondition } from '../RoboProgramStore/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  dragStart: () => dispatch(moveCondition(ownProps.code)),
  dragAbort: () => dispatch(releaseCondition()),
  dropCond: () => dispatch(dropCondition(ownProps.code.id)),
});

const Condition = connect(null, mapDispatchToProps)(({code, dragStart, dragAbort, dropCond}) => {
  const { t, i18n } = useTranslation();

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
    <>
      {((code.left === null) && (code.right === null))?(
        <div key={code.id} ref={(("drop" in code) && code.drop)?drop:drag} className={(code.val==="empty")?"empty-condition":"simple-condition"}>
          {t(`instrument.CONDITION.${code.val}`)}
        </div>
      ):(
        <div key={code.id} className="complex-condition">
          {(code.left !== null)&&(<Condition code={code.left} />)}
          <span ref={(("drop" in code) && code.drop)?drop:drag}>{t(`instrument.CONDITION.${code.val}-p`)}</span>
          {(code.right !== null)&&(<Condition code={code.right} />)}
        </div>
      )}
    </>
  );
});

export default Condition;