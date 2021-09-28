import React, { useContext } from "react";
import Modal from 'react-modal'
import { ModalContext } from '../context/ModalContext';

Modal.setAppElement(document.querySelector('#root'));

const AddTradeModal = ({ isOpen, closeModal, trustline }) => {
  const modalStyle = useContext(ModalContext)

  return (
    <Modal isOpen={isOpen} style={modalStyle}>

      <div>
        <span style={{ float: 'right' }} onClick={closeModal}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" /></svg>
        </span>
      </div>

      <p>Adding a trade item for {trustline.currency_code}</p>

    </Modal>
  )
}

export default AddTradeModal