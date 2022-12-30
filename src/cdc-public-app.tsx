import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './viridium-app.css';

import { homeApp } from './micro-apps/home/home-app';

function PublicHome(props: any) {
  //get api doc 
  return ( 
      <div className="cdc-public-app">
        <Router>
          {homeApp.getRoutes()}
        </Router>
      </div> 
  );
}

export default PublicHome;