import React, { useCallback, useEffect, useState, useContext } from "react";
import { AccountContext } from '../context/AccountContext';
import AddTradeModal from "./AddTradeModal";

function TrustlineCard({ trustline }) {
  const { handleRemoveMonitored, addTrade } = useContext(AccountContext)
  const [toXrpConversionPrice, setToXrpConversionPrice] = useState(0)
  const [fromXrpConversionPrice, setFromXrpConversionPrice] = useState(0)
  const [timestamp, setTimestamp] = useState(``)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const updatePrice = useCallback(async () => {
    const [rawResponse1, rawResponse2] = await Promise.all([fetch(trustline.to_xrp_conversion_price_url), fetch(trustline.from_xrp_conversion_price_url)])

    const parsedResponse1 = await rawResponse1.json()
    setToXrpConversionPrice(parseFloat(parsedResponse1.rate).toFixed(2))

    const parsedResponse2 = await rawResponse2.json()
    setFromXrpConversionPrice(parseFloat(parsedResponse2.rate).toFixed(2))

    const dateTime = Date.now()
    setTimestamp(`${new Date(dateTime).toLocaleDateString()} ${new Date(dateTime).toLocaleTimeString()}`)
  }, [])

  useEffect(() => (async () => await updatePrice())(), [])

  const removeMonitoring = useCallback(() => handleRemoveMonitored(trustline.currency_code))

  const openModal = useCallback(() => setIsModalOpen(true))
  const closeModal = useCallback(() => setIsModalOpen(false))

  return (
    <div className="uk-card uk-card-default uk-card-body uk-width-1-1">
      <div>
        <span style={{ float: 'right' }} onClick={removeMonitoring}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" /></svg>
        </span>
      </div>

      <h3 className="uk-card-title">{trustline.currency_code}</h3>
      <p>1 {trustline.currency_code} = {toXrpConversionPrice} XRP</p>
      <p>1 XRP = {fromXrpConversionPrice} {trustline.currency_code}</p>
      <p>UPDATED AT {timestamp}</p>

      <button onClick={updatePrice}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" /></svg>
      </button>

      <button onClick={openModal}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" /></svg>
      </button>

      <AddTradeModal isOpen={isModalOpen} closeModal={closeModal} trustline={trustline} />
    </div>
  )
}

export default TrustlineCard;