import React, { useCallback, useContext, useState, useRef } from "react";
import Modal from 'react-modal'
import { ModalContext } from '../context/ModalContext';
import { AccountContext } from '../context/AccountContext';

Modal.setAppElement(document.querySelector('#root'));

const AddMonitoringModal = ({ isOpen, closeModal }) => {
  const { account, handleAddMonitored } = useContext(AccountContext)
  const modalStyle = useContext(ModalContext)
  const select = useRef(null)
  const [chosenCurrency, setChosenCurrency] = useState('')

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    if (!select.current.value) return null
    handleAddMonitored(chosenCurrency)
    closeModal()
  })

  const handleChange = useCallback(e => setChosenCurrency(e.target.value))

  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <div>
        <span style={{ float: 'right' }} onClick={closeModal}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" /></svg>
        </span>
      </div>

      <p>Please choose an asset to monitor</p>

      <form onSubmit={handleSubmit}>
        <select ref={select} onChange={handleChange}>
          <option value="" defaultValue>Select Token</option>
          {
            account.trustlines.map((trustline, index) => {
              const isBeingMonitoredAlready = account.monitored.some(({ currency_code }) => currency_code === trustline.currency_code )

              if (!isBeingMonitoredAlready) return (<option key={index} value={trustline.currency_code}>
                {trustline.currency_code}
              </option>)
            })
          }
        </select>

        <button type="submit">
          CONFIRM
        </button>
      </form>

    </Modal>
  )
}

export default AddMonitoringModal