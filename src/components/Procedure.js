import '../styles/Procedure.css'
import CodeBlock from "./CodeBlock";
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { renameProcedure, deleteProcedure } from '../RoboProgramStore/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  rename: (title) => dispatch(renameProcedure(ownProps.procedure.id, title)),
  remove: () => dispatch(deleteProcedure(ownProps.procedure.id)),
});

const Procedure = connect(null, mapDispatchToProps)(({procedure, rename, remove}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="procedure">
      <div className="procedure-header">
        <button className="rename" onClick={() => rename(window.prompt(t("alerts.rename-procedure")))}></button>
        <span>{procedure.title}</span>
        {(procedure.id !== "0")&&(<button className="delete" onClick={() => {if (window.confirm(t("alerts.delete-procedure"))) remove();}}></button>)}
      </div>
      <div className="procedure-body">
        <CodeBlock code={procedure.code} />
      </div>
    </div>
  );
});

export default Procedure;