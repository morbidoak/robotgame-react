import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { newCommand, newCondition, releaseCommand, releaseCondition } from './RoboProgramStore/actions';

const mapDispatchToProps = (dispatch, ownProps) => {
  let result = {};
  if (ownProps.type === "COMMAND") {
    result.dragStart = () => dispatch(newCommand(ownProps.value));
    result.dragAbort = () => dispatch(releaseCommand());
  }
  
  if (ownProps.type === "CONDITION") {
    result.dragStart = () => dispatch(newCondition(ownProps.value));
    result.dragAbort = () => dispatch(releaseCondition());
  }
  
  return result;
};

const CodeInstrument = connect(null, mapDispatchToProps)(({type, value, dragStart, dragAbort}) => {
  const [{ isDragging }, drag] = useDrag({
    type: `NEW ${type}`,
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

  return (<div ref={drag} className="codeInstrument">{value}</div>);
});

export default CodeInstrument;