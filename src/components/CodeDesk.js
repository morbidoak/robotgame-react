import '../styles/CodeDesk.css'
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Procedure from'./Procedure.js';
import CodeInstrument from'./CodeInstrument.js';
import Dustbin from'./Dustbin.js';
import { newProcedure } from '../RoboProgramStore/actions';

const mapStateToProps = (state) => ({
  procedures: state.program.procedures,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  create: (dflt) => dispatch(newProcedure("asd")),
});

const CodeDesk = connect(mapStateToProps, mapDispatchToProps)(({procedures, create}) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="instruments">
        <CodeInstrument key="north" type="COMMAND" value="north" />
        <CodeInstrument key="south" type="COMMAND" value="south" />
        <CodeInstrument key="east" type="COMMAND" value="east" />
        <CodeInstrument key="west" type="COMMAND" value="west" />
        <CodeInstrument key="paint" type="COMMAND" value="paint" />
        <CodeInstrument key="call" type="COMMAND" value="call" />
        <div className="spacer"></div>
        <CodeInstrument key="if" type="COMMAND" value="if" />
        <CodeInstrument key="loop" type="COMMAND" value="loop" />
        <div className="spacer"></div>
        <CodeInstrument key="north free" type="CONDITION" value="north" />
        <CodeInstrument key="south free" type="CONDITION" value="south" />
        <CodeInstrument key="east free" type="CONDITION" value="east" />
        <CodeInstrument key="west free" type="CONDITION" value="west" />
        <CodeInstrument key="painted" type="CONDITION" value="paint" />
        <div className="spacer"></div>
        <CodeInstrument key="not" type="CONDITION" value="not" />
        <CodeInstrument key="and" type="CONDITION" value="and" />
        <CodeInstrument key="or" type="CONDITION" value="or" />
        <div className="spacer"></div>
        <Dustbin />
      </div>
      <div className="program">
        {procedures.map((procedure) => <Procedure procedure={procedure} key={procedure.id} />)}
        <button className="procedure-add" onClick={() => { create(t("instrument.new-procedure")) }}>{t("instrument.new-procedure")}</button>
      </div>
    </>
  );
});

export default CodeDesk;