import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import { trashCommand, trashCondition } from './RoboProgramStore/actions';

const mapDispatchToProps = (dispatch) => ({
  dropCmd: (type) => {
    if (type === "MOVE COMMAND")
      dispatch(trashCommand());
    if (type === "MOVE CONDITION")
      dispatch(trashCondition());
  },
});

const Dustbin = connect(null, mapDispatchToProps)(({dropCmd}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["MOVE COMMAND", "MOVE CONDITION"],
    drop: (item, monitor) => {dropCmd(monitor.getItemType())},
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (<div ref={drop} className="dustbin">{(isOver?">REMOVE<":"Dustbin")}</div>);
});

export default Dustbin;