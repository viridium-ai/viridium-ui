

import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/micro-app";
 
import './ghg-app.css';

import { GreenHouseWizard } from "./wizard-steps/summary";
import { InventoryConfig } from "./wizard-steps/inventory-config";
import { ReportConfig } from "./wizard-steps/report-config";
import { EmissionData } from "./wizard-steps/emission-data";
import { Analytics } from "./wizard-steps/analytics";
import { OffsetData } from "./wizard-steps/offset-data";

class GreenHouseApp implements MicroApp {
 
  public getTitle = () => {
    return "Green House Gas"
  }

  public getName = () => {
    return "ghg-app";
  }

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Data Manager", "Data Manager", undefined, "/dm-app")
  ];

  public getRouteItems = () => {
    return this.routeItems;
  }

  public getNavItems = () => {
    return [];
  }

  public getRoutes = () => {
    return (
      <>
        <Route path="/wizard" element={<GreenHouseWizard  />} />
        <Route path="/wizard/1" element={<InventoryConfig />} />
        <Route path="/wizard/2" element={<ReportConfig />} />
        <Route path="/wizard/3" element={<EmissionData />} />
        <Route path="/wizard/4" element={<Analytics />} />
        <Route path="/wizard/5" element={<OffsetData />} />
      </>
    );
  }
}

export const greenHouseApp: GreenHouseApp = new GreenHouseApp();