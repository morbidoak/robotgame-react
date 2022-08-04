import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { moveCommand, releaseCommand } from '../RoboProgramStore/actions.js';

const mapStateToProps = (state, ownProps) => ({
  isActive: (state.game.play !== "stop")&&(state.game.workflow[state.game.step].id === ownProps.code.id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dragStart: () => dispatch(moveCommand(ownProps.code)),
  dragAbort: () => dispatch(releaseCommand()),
});

const Command = connect(mapStateToProps, mapDispatchToProps)(({code, isActive, dragStart, dragAbort}) => {
  const { t, i18n } = useTranslation();

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
    <div ref={drag} className={`simple-command${isActive?" highlight":""}`}>
      {t(`instrument.COMMAND.${code.to}`)}
    </div>
  );
});

export default Command;