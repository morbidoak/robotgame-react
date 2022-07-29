import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { moveCommand, releaseCommand, setProcedureCall } from '../RoboProgramStore/actions';

const mapStateToProps = (state) => ({
  proceduresList: state.program.procedures.slice(1).map((procedure)=>({id:procedure.id, title: procedure.title})),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dragStart: () => dispatch(moveCommand(ownProps.code)),
  dragAbort: () => dispatch(releaseCommand()),
  setCall: (procedureId) => dispatch(setProcedureCall(ownProps.code.id, procedureId)),
});

const CallCode = connect(mapStateToProps, mapDispatchToProps)(({code, proceduresList, dragStart, dragAbort, setCall}) => {
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
    <div ref={drag} className="simple-command">
      <select value={code.src} onChange={(event => setCall(event.target.value))} >
        <option key="0" value="">{t("instrument.empty-procedure")}</option>
        {proceduresList.map((procedure) => (<option key={procedure.id} value={procedure.id}>{procedure.title}</option>))}
      </select>
      <span>{t("instrument.COMMAND.call-p")}</span>
    </div>
  );
});

export default CallCode;