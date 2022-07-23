import { connect } from 'react-redux';
import Procedure from'./Procedure.js';
import CodeInstrument from'./CodeInstrument.js';
import Dustbin from'./Dustbin.js';

const mapStateToProps = (state) => ({
  procedures: state.program.procedures,
});

const CodeDesk = connect(mapStateToProps, null)(({procedures}) => {
  return (
    <div className="codeDesk">
      <div className="procedures">
        {procedures.map((procedure) => <Procedure procedure={procedure} key={procedure.id} />)}
      </div>
      <div className="codeInstrumentBar">
        <CodeInstrument key="north" type="COMMAND" value="north" />
        <CodeInstrument key="south" type="COMMAND" value="south" />
        <CodeInstrument key="east" type="COMMAND" value="east" />
        <CodeInstrument key="west" type="COMMAND" value="west" />
        <CodeInstrument key="paint" type="COMMAND" value="paint" />
        <CodeInstrument key="if" type="COMMAND" value="if" />
        <CodeInstrument key="loop" type="COMMAND" value="loop" />
        <CodeInstrument key="call" type="COMMAND" value="call" />
        
        <CodeInstrument key="north free" type="CONDITION" value="north" />
        <CodeInstrument key="south free" type="CONDITION" value="south" />
        <CodeInstrument key="east free" type="CONDITION" value="east" />
        <CodeInstrument key="west free" type="CONDITION" value="west" />
        <CodeInstrument key="painted" type="CONDITION" value="paint" />
        <CodeInstrument key="not" type="CONDITION" value="not" />
        <CodeInstrument key="and" type="CONDITION" value="and" />
        <CodeInstrument key="or" type="CONDITION" value="or" />
        
        <Dustbin />
      </div>
    </div>
  );
});

export default CodeDesk;