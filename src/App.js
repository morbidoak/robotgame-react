import './App.css';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Board from'./Board.js'
import CodeDesk from'./CodeDesk.js'



function App() {


  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Board />
      <CodeDesk />
    </DndProvider>
    </>
  );
}

export default App;
