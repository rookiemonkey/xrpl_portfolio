import React from 'react';

const ModalContext = React.createContext();

const ModalContextProvider = ({ children }) => {
  const styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  }

  return (
    <ModalContext.Provider value={styles} >
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalContextProvider };