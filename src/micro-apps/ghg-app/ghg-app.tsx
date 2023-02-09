

import { Route } from "react-router-dom";

import { Help } from "../home/help";
import { CompanyConfig } from "./inventory-builder/company-config";
import { MappingCategories } from "./inventory-builder/inventory-categories";
import { InventoryConfig } from "./inventory-builder/inventory-config";
import { InventoryExport } from "./inventory-builder/inventory-export";
import { InventoryItemsView } from "./inventory-builder/inventory-items";
import { InventorySummary } from "./inventory-builder/inventory-summary";


import './ghg-app.css';
import { CompanyList } from "./inventory-builder/companies";
import { MicroApp, RouteItem } from "../../components/v-common/v-app";
import { SiteList } from "./inventory-builder/sites";

class GreenHouseApp extends MicroApp {

  public getTitle = () => {
    return "GHG Report Wizard"
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
        <Route path="/ghg-app" element={<CompanyList next={'/ghg-app/site'} />} />
        <Route path="/ghg-app/company" element={<CompanyList next={'/ghg-app/site'}  />} />
        <Route path="/ghg-app/site" element={<SiteList prev={'/ghg-app/company'}  next={'/ghg-app/inventory'}  />} />
        <Route path="/ghg-app/inventory" element={<InventoryConfig next={'/ghg-app/inventoryItems'} prev={'/ghg-app/site'}/>} />
        <Route path="/ghg-app/inventoryItems" element={<InventoryItemsView  next={'/ghg-app/mappings'} prev={'/ghg-app/inventory'}/>} />
        <Route path="/ghg-app/mappings" element={<MappingCategories next={'/ghg-app/summary'} prev={'/ghg-app/items'} />} />
        <Route path="/ghg-app/summary" element={<InventorySummary  next={'/ghg-app/export'} prev={'/ghg-app/mappings'} />} />
        <Route path="/ghg-app/export" element={<InventoryExport prev={'/ghg-app/summary'}/>} />
        <Route path="/ghg-app/help" element={<Help />} />
      </>
    );
  }
}

export const greenHouseApp: GreenHouseApp = new GreenHouseApp();