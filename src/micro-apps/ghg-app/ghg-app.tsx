

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
        <Route path="/ghg-app" element={<CompanyList next={'/ghg-app/company'} />} />
        <Route path="/ghg-app/pick" element={<CompanyList next={'/ghg-app/company'}  />} />
        <Route path="/ghg-app/company" element={<CompanyConfig prev={'/ghg-app/pick'}  next={'/ghg-app/config'}  />} />
        <Route path="/ghg-app/config" element={<InventoryConfig next={'/ghg-app/items'} prev={'/ghg-app/company'}/>} />
        <Route path="/ghg-app/items" element={<InventoryItemsView  next={'/ghg-app/mappings'} prev={'/ghg-app/config'}/>} />
        <Route path="/ghg-app/mappings" element={<MappingCategories next={'/ghg-app/summary'} prev={'/ghg-app/items'} />} />
        <Route path="/ghg-app/summary" element={<InventorySummary  next={'/ghg-app/export'} prev={'/ghg-app/mappings'} />} />
        <Route path="/ghg-app/export" element={<InventoryExport prev={'/ghg-app/summary'}/>} />
        <Route path="/ghg-app/help" element={<Help />} />
      </>
    );
  }
}

export const greenHouseApp: GreenHouseApp = new GreenHouseApp();