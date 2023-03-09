

import { Route } from "react-router-dom";

import { MappingCategories } from "./pages/inventory-categories";
import { InventoryConfig } from "./pages/inventory-config";
import { InventoryExport } from "./pages/inventory-export";
import { InventoryItemsView } from "./pages/inventory-items";
import { InventorySummary } from "./pages/inventory-summary";


import './ghg-app.css';
import { CompanyList } from "./pages/companies";
import { MicroApp, RouteItem } from "components/v-common/v-app";
import { SiteList } from "./pages/sites";

class GreenHouseApp extends MicroApp {

  public getTitle = () => {
    return "GHG Report Wizard"
  }

  public isSecure = () =>  false;
  public getName = () => {
    return "ghg-app";
  }

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Data Manager", "Data Manager", undefined, "/ghg-app")
  ];

  public getRouteItems = () => {
    return this.routeItems;
  }

  public getRoutes = () => {
    return (
      <>
        <Route path="/ghg-app" element={<CompanyList next={'/ghg-app/site'} />} />
        <Route path="/ghg-app/company" element={<CompanyList next={'/ghg-app/site'}  />} />
        <Route path="/ghg-app/site" element={<SiteList prev={'/ghg-app/company'}  next={'/ghg-app/inventory'}  />} />
        <Route path="/ghg-app/inventory" element={<InventoryConfig next={'/ghg-app/inventoryItems'} prev={'/ghg-app/site'}/>} />
        <Route path="/ghg-app/inventoryItems" element={<InventoryItemsView  next={'/ghg-app/mappings'} prev={'/ghg-app/inventory'}/>} />
        <Route path="/ghg-app/mappings" element={<MappingCategories next={'/ghg-app/summary'} prev={'/ghg-app/inventoryItems'} />} />
        <Route path="/ghg-app/summary" element={<InventorySummary  next={'/ghg-app/export'} prev={'/ghg-app/mappings'} />} />
        <Route path="/ghg-app/export" element={<InventoryExport prev={'/ghg-app/summary'}/>} />
      </>
    );
  }
}

export const greenHouseApp: GreenHouseApp = new GreenHouseApp();