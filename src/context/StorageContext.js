import React, { useCallback } from 'react';

const StorageContext = React.createContext();

const StorageContextProvider = ({ children }) => {
  const addMonitoring = useCallback((address, newMonitoring) => {
    const savedMonitoring = JSON.parse(localStorage.getItem(address))

    if (!savedMonitoring) return localStorage.setItem(address, JSON.stringify([newMonitoring]))

    savedMonitoring.push(newMonitoring)
    localStorage.setItem(address, JSON.stringify(savedMonitoring))
  })

  const retrieveMonitoring = useCallback(address => JSON.parse(localStorage.getItem(address)))

  const updateMonitoring = useCallback((address, newMonitoring) => localStorage.setItem(address, JSON.stringify(newMonitoring)))

  return (
    <StorageContext.Provider value={{ addMonitoring, retrieveMonitoring, updateMonitoring }} >
      {children}
    </StorageContext.Provider>
  )
}

export { StorageContext, StorageContextProvider };