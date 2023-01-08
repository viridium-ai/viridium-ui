

import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/micro-app";

import './ghg-app.css';

import { GreenHouseWizard } from "./wizard-steps/summary";
import { InventoryConfig } from "./wizard-steps/inventory-config";
import { ReportConfig } from "./wizard-steps/report-config";
import { EmissionData } from "./wizard-steps/emission-data";
import { Analytics } from "./wizard-steps/analytics";
import { OffsetData } from "./wizard-steps/offset-data";
import { InventoryItemConfig } from "../inventory-app/wizard-steps/config";
import { InventoryItems } from "../inventory-app/wizard-steps/items";

class GreenHouseApp implements MicroApp {

  public getTitle = () => {
    return "Green House Gas"
  }

  public getName = () => {
    return "ghg-app";
  }

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Data Manager", "Data Manager", undefined, "/ghg-app")
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
        <Route path="/report" element={<GreenHouseWizard />} />
        <Route path="/report/config" element={<InventoryItemConfig />} />
        <Route path="/report/items" element={<InventoryItems />} />
        <Route path="/report/categories" element={<EmissionData />} />
        <Route path="/report/4" element={<Analytics />} />
        <Route path="/report/5" element={<OffsetData />} />
      </>
    );
  }
}

export const greenHouseApp: GreenHouseApp = new GreenHouseApp();