import InsertArea from'./InsertArea.js'
import Command from'./Command.js'
import IfBlock from './IfBlock.js';
import LoopBlock from './LoopBlock.js';
import CallCode from'./CallCode.js'

function drawCode(code) {
  let result = [];
  for (let i=0; i<code.length; i++) {
    if (code[i].type === "insert") 
      result.push(<InsertArea key={code[i].id} code={code[i]} />);

    if (code[i].type === "move") 
      result.push(<Command key={code[i].id} code={code[i]} />);
        
    if (code[i].type === "if") 
      result.push(<IfBlock key={code[i].id} code={code[i]} />);

    if (code[i].type === "loop") 
      result.push(<LoopBlock key={code[i].id} code={code[i]} />);

    if (code[i].type === "call") 
      result.push(<CallCode key={code[i].id} code={code[i]} />);
  }
  return result;
}

function CodeBlock({code}) {
  return (
    <>
      {drawCode(code)}
    </>
  );
}

export default CodeBlock;