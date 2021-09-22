import React, { useCallback, useState, useContext, useEffect } from 'react';
import { AccountContext } from '../context/AccountContext';
import TrustlineCard from '../components/TrustlineCard';
import AddMonitoringModal from '../components/AddMonitoringModal';

function Dashboard() {
  const { account } = useContext(AccountContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => setIsModalOpen(true))
  const closeModal = useCallback(() => setIsModalOpen(false))

  return (
    <div className="uk-container">
      <h1 className="uk-heading-medium">
        XRPL Tokens
      </h1>

      <AddMonitoringModal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
      />

      <div className="uk-grid uk-margin-remove">
        {
          account.monitored.map(trustline => <TrustlineCard key={trustline.currency_code} trustline={trustline}/>)
        }

        <div className="uk-card uk-card-default uk-card-body uk-width-1-4">
          ADD A TOKEN TO MONITOR
          <button onClick={openModal}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;