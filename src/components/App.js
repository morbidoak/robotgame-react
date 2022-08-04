import '../styles/App.css';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation, Trans } from 'react-i18next';
import { saveRoboProgram } from '../functions/storeRoboProgram.js';
import Board from'./Board.js'
import CodeDesk from'./CodeDesk.js'

const mapStateToProps = (state) => ({
  state: state,
});

const App = connect(mapStateToProps, null)(({state}) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    saveRoboProgram(state);
  }, [state]);

  return (
    <div className="centroid">
      <div className="header">
        <div className="logo"></div>
        <h1>
          <Trans i18nKey="title">Programming:<span>robot game</span></Trans>
        </h1>
        <select className={i18n.resolvedLanguage} defaultValue={i18n.resolvedLanguage} onChange={(e) => i18n.changeLanguage(e.target.value)}>
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
        {state.game.play !== "stop"&&(
          <>
          <div className="field-click-shield"></div>
          <div className="program-click-shield"></div>
          </>
        )}
      </DndProvider>
    </div>
  );
});

export default App;
