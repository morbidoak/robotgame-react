import InsertArea from'./InsertArea.js'
import Command from'./Command.js'
import IfBlock from './IfBlock.js';
import LoopBlock from './LoopBlock.js';
import CallCode from'./CallCode.js'

function drawCode(code, dispatchCode) {
  let result = [];
  for (let i=0; i<code.length; i++) {
    if (code[i].type === "insert") 
      result.push(
        <InsertArea 
          key={code[i].id} 
          dropCmd={() => dispatchCode({type: "cmdRelease", dropId: code[i].id})} 
        />);

    if (code[i].type === "move") 
      result.push(
        <Command 
          cmd={code[i].to} 
          key={code[i].id} 
          dragStart={()=>dispatchCode({type: "cmdMoveBegin", dragCode: code[i], dragId:code[i].id})}  
          dragAbort={()=>dispatchCode({type: "cmdAbort"})}
        />);
        
    if (code[i].type === "if") result.push(<IfBlock code={code[i]} key={code[i].id} dispatchCode={(action) => dispatchCode(action)} />);
    if (code[i].type === "loop") result.push(<LoopBlock code={code[i]} key={code[i].id} dispatchCode={(action) => dispatchCode(action)} />);
    if (code[i].type === "call") result.push(<CallCode src={code[i].src} key={code[i].id} />);
  }
  return result;
}

function CodeBlock({code, dispatchCode}) {
  return (
    <div className="codeBlock">
      {drawCode(code, dispatchCode)}
    </div>
  );
}

export default CodeBlock;