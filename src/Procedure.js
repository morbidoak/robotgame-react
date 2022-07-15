import CodeBlock from "./CodeBlock";

function Procedure({title, code, dispatchCode}) {

  return (
    <div className="procedure">
      {(title!=="_")&&(<div className="procedureTitle">{title}</div>)}
      <CodeBlock code={code} dispatchCode={dispatchCode} />
    </div>
  );

}

export default Procedure;