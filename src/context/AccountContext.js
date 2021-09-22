import React, { useCallback, useState, useContext, useEffect } from 'react';
import { HexCodeContext } from './HexCodeContext';
import { StorageContext } from './StorageContext';

const AccountContext = React.createContext();

const AccountContextProvider = ({ children }) => {
  const { addMonitoring, updateMonitoring, retrieveMonitoring } = useContext(StorageContext)
  const { hexCodeMap } = useContext(HexCodeContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [account, setAccount] = useState({ address: '', trustlines: [], monitored: [], assets: {} })

  const handleSetAccount = useCallback(async address => {
    const raw = await fetch(`https://api.xrpscan.com/api/v1/account/${address}/trustlines`)
    const res = await raw.json()
    const trustlines = []

    res.forEach(trustline => {
      const isHexCodeOnly = trustline.specification.currency.length > 5
      const issuer_account = trustline.specification.counterparty
      const hex_code = trustline.specification.currency

      trustlines.push({
        currency_code: isHexCodeOnly ? hexCodeMap.get(hex_code) : hex_code,
        hex_code,
        issuer_account
      })
    })

    const monitored = retrieveMonitoring(address)

    setAccount({ ...account, address, trustlines, monitored })
    setIsLoggedIn(true)
  }, [])

  const handleAddMonitored = useCallback(async (currency_code, locally = true) => {
    const copy = account.trustlines.find(trustline => trustline.currency_code === currency_code)

    const trustline = {
      ...copy,
      to_xrp_conversion_price_url: `https://data.ripple.com/v2/exchange_rates/${copy.hex_code}+${copy.issuer_account}/XRP`,
      from_xrp_conversion_price_url: `https://data.ripple.com/v2/exchange_rates/XRP/${copy.hex_code}+${copy.issuer_account}`
    }

    setAccount({ ...account, monitored: [...account.monitored, trustline] })
    if(locally) addMonitoring(account.address, trustline)
  })

  const handleRemoveMonitored = useCallback(currency_code => {
    const monitored = account.monitored.filter(trustline => trustline.currency_code !== currency_code)
    setAccount({ ...account, monitored })
    updateMonitoring(account.address, monitored)
  })

  const handleRemoveAccount = useCallback(() => {
    setAccount({ address: '', trustlines: [], monitored: [] })
    setIsLoggedIn(false)
  })

  return (
    <AccountContext.Provider value={{ isLoggedIn, account, handleSetAccount, handleRemoveAccount, handleAddMonitored, handleRemoveMonitored }} >
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountContextProvider };