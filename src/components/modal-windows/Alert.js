import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { closeWindow } from '../../RoboProgramStore/actions.js';
Modal.setAppElement('#root');

const mapStateToProps = (state) => ({
  isOpen: (state.modals.windowType === "alert"),
  message: state.modals.params.message,
  label: state.modals.params.label,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(closeWindow()),
});

const Alert = connect(mapStateToProps, mapDispatchToProps)(({isOpen, message, label, handleClose}) => {
  const { t, i18n } = useTranslation();
  return (
    <Modal 
        isOpen={isOpen}
        contentLabel={label}
        onRequestClose={handleClose}
        className="modal-window"
        overlayClassName="modal-overlay"
    >
      <div className="alert">
        <div className="header">
          <span>{label}</span>
        </div>
        <div className="body">
          <p>{message}</p>
          <div className="buttons">
            <button onClick={handleClose}>{t("alerts.ok")}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default Alert;