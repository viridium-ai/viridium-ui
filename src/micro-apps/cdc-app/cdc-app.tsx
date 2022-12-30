

import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/micro-app";
import { Dashboard } from "./dashboard";
import { DataManagement } from "./data-management";
import { Help } from "./help";
import { Analytics } from "./analytics";
import { MarketPlace } from "./market-place";
import './cdc-app.css';
class CarbonApp implements MicroApp {

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Dashboard", "Dashboard", undefined, "/carbon/dashboard"),
    new RouteItem().init("Data Management", "Data Management", undefined, "/carbon/dm"),
    new RouteItem().init("Market Place", "Market Place", undefined, "/carbon/marketplace"),
    new RouteItem().init("Analytics", "Analytics", undefined, "/carbon/analytics"),
    new RouteItem().init("Help", "Help", undefined, "/carbon/help")
  ];

  public getTitle = () => {
    return "VIRIDIUM";
  }
  public getName = () => {
    return "cdc-app";
  }
  public getRouteItems = () => {
    return this.routeItems;
  }

  public getNavItems = () => {
    return [];
  }

  public getRoutes = () => {

    return (
      <>
        <Route path="/carbon/dashboard" element={<Dashboard />} />
        {/* <Route path="/carbon/planning" element={<Planning />} /> */}
        <Route path="/carbon/dm" element={<DataManagement />} />
        {/* <Route path="/carbon/workspace" element={<IntelligenceWorkspace />} /> */}
      <Route path="/carbon/marketplace" element={<MarketPlace />} /> 
        <Route path="/carbon/analytics" element={<Analytics />} />
        <Route path="/carbon/help" element={<Help />} />
      </>
    );

  }
}


export const carbonApp: CarbonApp = new CarbonApp();