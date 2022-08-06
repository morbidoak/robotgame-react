import '../styles/App.css';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation, Trans } from 'react-i18next';
import Alert from './modal-windows/Alert.js';
import Confirm from './modal-windows/Confirm.js';
import Prompt from './modal-windows/Prompt.js';
import Select from './modal-windows/Select.js';
import Board from'./Board.js';
import CodeDesk from'./CodeDesk.js';
import { saveRoboProgram, loadRoboProgram, listOfRoboProgram } from '../functions/storeRoboProgram.js';
import { resetState, setState, alertWindow, confirmWindow, selectWindow } from '../RoboProgramStore/actions.js';

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  alert: (label, message) => dispatch(alertWindow(label, message)),
  confirm: (label, message, onOk) => dispatch(confirmWindow(label, message, onOk)),
  select: (label, message, collection, onOk) => dispatch(selectWindow(label, message, collection, onOk)),
  newProgram: () => dispatch(resetState()),
  setProgram: (state) => dispatch(setState(state)),
});

const App = connect(mapStateToProps, mapDispatchToProps)(({state, alert, confirm, select, newProgram, setProgram}) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    saveRoboProgram(state);
  }, [state]);

  const save = () => {
    const title = state.program.procedures[0].title;
    if (title === "") {
      alert(t("alerts.save"), t("alerts.save-empty"));
      return 0;
    }
    if (!saveRoboProgram(state, title, false)) {
      confirm(
        t("alerts.save"), 
        t("alerts.save-confirm", {programName: title}), 
        () => { 
          saveRoboProgram(state, title, true); 
          alert(t("alerts.save"), t("alerts.save-success", {programName: title})); }
        );
    } else {
      alert(t("alerts.save"), t("alerts.save-success", {programName: title}));
    }
  };

  const load = () => {
    confirm(
      t("alerts.load"), 
      t("alerts.new-confirm"), 
      () => ( 
        select(t("alerts.load"), "", listOfRoboProgram(), (key) => setProgram(loadRoboProgram(key)))
      )
    );
  };

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
        <a className="lessons" onClick={() => alert(t("alerts.ops"), t("alerts.not-released"))}>{t("menu.lessons")}</a>
        <a className="load" onClick={() => load()}>{t("menu.load")}</a>
        <a className="save" onClick={() => save()}>{t("menu.save")}</a>
        <a className="new" onClick={() => confirm(t("alerts.new"), t("alerts.new-confirm"), newProgram)}>{t("menu.new")}</a>
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
        <Alert />
        <Confirm />
        <Prompt />
        <Select />
      </DndProvider>
    </div>
  );
});

export default App;
