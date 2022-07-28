import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import { dropCommand } from '../RoboProgramStore/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  dropCmd: () => dispatch(dropCommand(ownProps.code.id))
});

const InsertArea = connect(null, mapDispatchToProps)(({code, dropCmd}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["MOVE COMMAND", "NEW COMMAND"],
    drop: () => dropCmd(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={"command-placement"+(isOver?"":" hidden")}>
      {isOver&&(<div className="empty-command"></div>)}
    </div>);
});

export default InsertArea;