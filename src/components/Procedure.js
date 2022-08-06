import '../styles/Procedure.css'
import CodeBlock from "./CodeBlock";
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { renameProcedure, deleteProcedure, confirmWindow, promptWindow } from '../RoboProgramStore/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  rename: (title) => dispatch(renameProcedure(ownProps.procedure.id, title)),
  remove: () => dispatch(deleteProcedure(ownProps.procedure.id)),
  confirm: (label, message, onOk) => dispatch(confirmWindow(label, message, onOk)),
  prompt: (label, message, defaultValue, onOk) => dispatch(promptWindow(label, message, defaultValue, onOk)),
});

const Procedure = connect(null, mapDispatchToProps)(({procedure, rename, remove, confirm, prompt}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="procedure">
      <div className="procedure-header">
        <button className="rename" onClick={() => prompt(t("alerts.rename"), t("alerts.rename-procedure"), procedure.title, rename)}></button>
        <span>{procedure.title}</span>
        {(procedure.id !== "0")&&(<button className="delete" onClick={() => confirm(t("alerts.delete"), t("alerts.delete-procedure"), remove)}></button>)}
      </div>
      <div className="procedure-body">
        <CodeBlock code={procedure.code} />
      </div>
    </div>
  );
});

export default Procedure;