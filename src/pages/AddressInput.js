import React, { useCallback, useContext, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { AccountContext } from '../context/AccountContext';

function AddressInput() {
  const { handleSetAccount } = useContext(AccountContext)
  const input = useRef(null)
  const history = useHistory();

  const handleSubmit = useCallback(async event => {
    event.preventDefault()
    handleSetAccount(input.current.value)
    history.push('/dashboard')
  })

  return(
    <div className="uk-container">
      <h1 className="uk-heading-small">
        Please add your XRP Address
      </h1>
      <small>This will import all of your trustlines by using the XRPSCAN API</small>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={input} />
        <button>SUBMIT</button>
      </form>
    </div>
  )
}

export default AddressInput;