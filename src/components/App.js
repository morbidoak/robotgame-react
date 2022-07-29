import '../styles/App.css';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation, Trans } from 'react-i18next';

import Board from'./Board.js'
import CodeDesk from'./CodeDesk.js'

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="centroid">
      <div className="header">
        <div className="logo"></div>
        <h1>
          <Trans i18nKey="title">Programming:<span>robot game</span></Trans>
        </h1>
        <select className={i18n.language} defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
        <a className="lessons" onClick={()=>alert(t("alerts.not-released"))}>{t("menu.lessons")}</a>
        <a className="load" onClick={()=>alert(t("alerts.not-released"))}>{t("menu.load")}</a>
        <a className="save" onClick={()=>alert(t("alerts.not-released"))}>{t("menu.save")}</a>
        <a className="new" onClick={()=>alert(t("alerts.not-released"))}>{t("menu.new")}</a>
      </div>
      <DndProvider backend={HTML5Backend}>
        <Board />
        <CodeDesk />
      </DndProvider>
    </div>
  );
}

export default App;
