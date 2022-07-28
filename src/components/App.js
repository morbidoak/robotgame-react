import '../styles/App.css';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Board from'./Board.js'
import CodeDesk from'./CodeDesk.js'

function App() {
  return (
    <div className="centroid">
      <div className="header">
        <h1>
          Программирование: 
          <span>игра в робота</span>
        </h1>
        <select className="ru">
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
        <a className="lessons" href="#">Учебник</a>
        <a className="load" href="#">Загрузить</a>
        <a className="save" href="#">Сохранить</a>
        <a className="new" href="#">Создать</a>
      </div>
      <DndProvider backend={HTML5Backend}>
        <Board />
        <CodeDesk />
      </DndProvider>
    </div>
  );
}

export default App;
