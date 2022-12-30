import { useState } from 'react';

import { BrowserRouter as Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './viridium-app.css'

import { UserContextType, UserContext, securityManager } from './common/security/security-manager';

import { homeApp } from './micro-apps/home/home-app';
import { dataSourceManager } from './micro-apps/dm-app/dm-app';
import { greenHouseApp } from './micro-apps/ghg-app/ghg-app';
import { securityApp } from './micro-apps/security/security-app';
import { inventoryConfigApp } from './micro-apps/inventory-app/inventory-app';

function App(props: any) {
  const [state] = useState<UserContextType>(securityManager.getUserContext());
  return (
    <UserContext.Provider value={state} >
      <div className="viridium-app">
        <Router>
          <Routes>
            {homeApp.getRoutes()}
            {dataSourceManager.getRoutes()}
            {greenHouseApp.getRoutes()}
            {securityApp.getRoutes()}
            {inventoryConfigApp.getRoutes()}
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
