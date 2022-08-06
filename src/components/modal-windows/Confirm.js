import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { closeWindow } from '../../RoboProgramStore/actions.js';
Modal.setAppElement('#root');

const mapStateToProps = (state) => ({
  isOpen: (state.modals.windowType === "confirm"),
  message: state.modals.params.message,
  label: state.modals.params.label,
  onOk: state.modals.params.onOk,
  onCancel: state.modals.params.onCancel,
});

const mapDispatchToProps = (dispatch, ) => ({
  closeWindow: () => {dispatch(closeWindow())},
});

const Confirm = connect(mapStateToProps, mapDispatchToProps)(({isOpen, message, label, onOk, onCancel, closeWindow}) => {
  const { t, i18n } = useTranslation();
  return (
    <Modal 
        isOpen={isOpen}
        contentLabel={label}
        onRequestClose={closeWindow}
        className="modal-window"
        overlayClassName="modal-overlay"
    >
      <div className="confirm">
        <div className="header">
          <span>{label}</span>
        </div>
        <div className="body">
          <p>{message}</p>
          <div className="buttons">
            <button onClick={() => {onOk(); closeWindow()}}>{t("alerts.ok")}</button>
            <button onClick={() => {onCancel(); closeWindow()}}>{t("alerts.cancel")}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default Confirm;