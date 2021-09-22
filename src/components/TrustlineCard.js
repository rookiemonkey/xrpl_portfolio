import React, { useCallback, useEffect, useState, useContext } from "react";
import { AccountContext } from '../context/AccountContext';

function TrustlineCard({ trustline }) {
  const { handleRemoveMonitored } = useContext(AccountContext)
  const [assets, setAssets] = useState([])
  const [toXrpConversionPrice, setToXrpConversionPrice] = useState(0)
  const [fromXrpConversionPrice, setFromXrpConversionPrice] = useState(0)

  const updatePrice = useCallback(async () => {
    const [rawResponse1, rawResponse2] = await Promise.all([fetch(trustline.to_xrp_conversion_price_url), fetch(trustline.from_xrp_conversion_price_url)])

    const parsedResponse1 = await rawResponse1.json()
    setToXrpConversionPrice(parseFloat(parsedResponse1.rate).toFixed(2))

    const parsedResponse2 = await rawResponse2.json()
    setFromXrpConversionPrice(parseFloat(parsedResponse2.rate).toFixed(2))
  }, [])

  useEffect(() => (async () => updatePrice())(), [])

  const timestamp = useCallback(() => Date.now())

  const removeMonitoring = useCallback(() => handleRemoveMonitored(trustline.currency_code))

  return (
    <div className="uk-card uk-card-default uk-card-body uk-width-1-4">
      <div>
        <span style={{ float: 'right' }} onClick={removeMonitoring}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" /></svg>
        </span>
      </div>

      <h3 className="uk-card-title">{trustline.currency_code}</h3>
      <p>1 {trustline.currency_code} = {toXrpConversionPrice} XRP</p>
      <p>1 XRP = {fromXrpConversionPrice} {trustline.currency_code}</p>
      <p>UPDATED AT {`${new Date(timestamp()).toLocaleDateString()} ${new Date(timestamp()).toLocaleTimeString()}`}</p>

      <button onClick={updatePrice}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" /></svg>
      </button>
    </div>
  )
}

export default TrustlineCard;