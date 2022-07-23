import { useState } from "react";
import CodeBlock from "./CodeBlock";
import { connect } from 'react-redux';
import { newProcedure, renameProcedure, deleteProcedure } from './RoboProgramStore/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  create: () => dispatch(newProcedure("New procedure")),
  rename: (title) => dispatch(renameProcedure(ownProps.procedure.id, title)),
  remove: () => dispatch(deleteProcedure(ownProps.procedure.id)),
});


const Procedure = connect(null, mapDispatchToProps)(({procedure, create, rename, remove}) => {
  const [editing, setEditing] = useState(null);

  return (
    <div className="procedure">
      <div className="procedureTitle">
        {(editing===null)?(
          <>
            {procedure.title} 
            <button onClick={() => setEditing(procedure.title)}>edit</button>
          </>
          
        ):(
          <>
            <input value={editing} onChange={(event)=>setEditing(event.target.value)} />
            <button onClick={() => {rename(editing); setEditing(null);}}>V</button>
            <button onClick={() => setEditing(null)}>X</button>
          </>
        )}
        {(procedure.id === "0")?(
          <button style={{float:'right'}} onClick={() => { create() }}>New procedure</button>
        ):(
          <button style={{float:'right'}} onClick={() => {if (window.confirm("Really?")) remove();}}>(X)</button>
        )}
      </div>
      <CodeBlock code={procedure.code} />
    </div>
  );
});

export default Procedure;