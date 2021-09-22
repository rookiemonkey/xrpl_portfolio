import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AccountContextProvider } from "./context/AccountContext";
import { HexCodeContextProvider } from "./context/HexCodeContext";
import { ModalContextProvider } from "./context/ModalContext";
import { StorageContextProvider } from "./context/StorageContext";
import AddressInput from './pages/AddressInput';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <StorageContextProvider>
      <HexCodeContextProvider>
        <AccountContextProvider>
          <ModalContextProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={AddressInput} />
                <Route exact path="/dashboard" component={Dashboard} />
              </Switch>
            </BrowserRouter>
          </ModalContextProvider>
        </AccountContextProvider>
      </HexCodeContextProvider>
    </StorageContextProvider>
  );
}

export default App;
