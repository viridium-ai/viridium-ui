import { useState } from 'react';

import { HashRouter as Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'

import { homeApp } from './micro-apps/home/home-app';
import { dataSourceManager } from './micro-apps/dm-app/dm-app';
import { greenHouseApp } from './micro-apps/ghg-app/ghg-app';
import { inventoryConfigApp } from './micro-apps/inventory-app/inventory-app';
import { demoApp } from './micro-apps/demo-app/demo-app';
import { securityApp } from './components/v-security/security-app';
import { UserContextType, securityManager, UserContext } from './components/v-security/v-security-manager';
import { knowledgeApp } from './micro-apps/knowledge-base-app/knowledge-app';
import { serviceApp } from './micro-apps/service-browser/service-app';

function App(props: any) {
  const [state] = useState<UserContextType>(securityManager.getUserContext());
  return (
    <UserContext.Provider value={state} >
      <div className="viridium-app">
        <Router basename='/'>
          <Routes>
            {homeApp.getRoutes()}
            {dataSourceManager.getRoutes()}
            {greenHouseApp.getRoutes()}
            {securityApp.getRoutes()}
            {inventoryConfigApp.getRoutes()}
            {demoApp.getRoutes()},
            {knowledgeApp.getRoutes()},
            {serviceApp.getRoutes()}
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
