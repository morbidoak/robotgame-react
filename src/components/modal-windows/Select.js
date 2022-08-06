import { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { closeWindow } from '../../RoboProgramStore/actions.js';
Modal.setAppElement('#root');

const mapStateToProps = (state) => ({
  isOpen: (state.modals.windowType === "select"),
  message: state.modals.params.message,
  label: state.modals.params.label,
  onOk: state.modals.params.onOk,
  onCancel: state.modals.params.onCancel,
  collection: state.modals.params.collection,
});

const mapDispatchToProps = (dispatch, ) => ({
  closeWindow: () => {dispatch(closeWindow())},
});

const Select = connect(mapStateToProps, mapDispatchToProps)(({isOpen, message, label, onOk, onCancel, collection, closeWindow}) => {
  const { t, i18n } = useTranslation();
  const [val, setVal] = useState("");

  return (
    <Modal 
        isOpen={isOpen}
        contentLabel={label}
        onRequestClose={closeWindow}
        className="modal-window"
        overlayClassName="modal-overlay"
    >
      <div className="select">
        <div className="header">
          <span>{label}</span>
        </div>
        <div className="body">
          {collection && (
            <div
             className="collection">
              {collection.map((item, index) =>  
                <>
                  <input type="radio" id={`selectItem${index}`} name="selectItem" key={`radio-${item}`} value={item} checked={val === item} onChange={(event)=>setVal(event.target.value)} />
                  <label key={`label-${item}`} htmlFor={`selectItem${index}`}>{item}</label>
                </>
              )}
            </div>
          )}
          <div className="buttons">
            <button onClick={() => {onOk(val); closeWindow()}}>{t("alerts.ok")}</button>
            <button onClick={() => {onCancel(val); closeWindow()}}>{t("alerts.cancel")}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default Select;