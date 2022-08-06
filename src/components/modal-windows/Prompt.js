import { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { closeWindow } from '../../RoboProgramStore/actions.js';
Modal.setAppElement('#root');

const mapStateToProps = (state) => ({
  isOpen: (state.modals.windowType === "prompt"),
  message: state.modals.params.message,
  label: state.modals.params.label,
  onOk: state.modals.params.onOk,
  onCancel: state.modals.params.onCancel,
  defaultValue: state.modals.params.defaultValue,
});

const mapDispatchToProps = (dispatch, ) => ({
  closeWindow: () => {dispatch(closeWindow())},
});

const Prompt = connect(mapStateToProps, mapDispatchToProps)(({isOpen, message, label, onOk, onCancel, defaultValue, closeWindow}) => {
  const { t, i18n } = useTranslation();
  const [val, setVal] = useState(defaultValue);

  return (
    <Modal 
        isOpen={isOpen}
        contentLabel={label}
        onRequestClose={closeWindow}
        className="modal-window"
        overlayClassName="modal-overlay"
    >
      <div className="prompt">
        <div className="header">
          <span>{label}</span>
        </div>
        <div className="body">
          <p>{message}</p>
          <input type="text" value={val} onChange={(event)=>setVal(event.target.value)} defaultValue={defaultValue} />
          <div className="buttons">
            <button onClick={() => {onOk(val); closeWindow()}}>{t("alerts.ok")}</button>
            <button onClick={() => {onCancel(val); closeWindow()}}>{t("alerts.cancel")}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default Prompt;