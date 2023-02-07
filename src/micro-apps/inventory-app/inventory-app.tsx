import { Route } from "react-router-dom";

import { DataSources } from "./flow-steps/data-sources";
import { DataCollectionWizard } from "./flow-steps/company-summary";
import { ValueChainCategories } from "./flow-steps/value-chain-categories";
import { Questionnaires } from "./flow-steps/questionnaires";
import { Help } from "./help";
import { InventoryCategories } from "./flow-steps/inventory-categories";
import { InventoryConfig } from "./flow-steps/inventory-config";
import './inventory-app.css';
import { HomeApp } from "../home/home-app";
import { RouteItem } from "../../components/v-common/v-app";

export class InventoryConfigApp extends HomeApp {

  public getTitle = () => {
    return "Inventory App"
  }

  public getName = () => {
    return "inventory-app";
  }
  public routeItems: Array<RouteItem> = [
    new RouteItem().init("Inventory Config", "Inventory Config", "2", "/inventory-app"),
    new RouteItem().init("Data Manager", "Data Manager", "2", "/dm-app"),
    new RouteItem().init("GHG Reports", "GHG Reports", "2", "/ghg-app"),
    new RouteItem().init("Sign out", "Sign out", "2", "/signout"),
  ];

  public getRoutes = () => {
    return (
      <>
        <Route path="/inventory-app" element={<DataCollectionWizard next={'/inventory-app/config'} />} />
        <Route path="/inventory-app/config" element={<InventoryConfig next={'/inventory-app/items'} prev='/inventory-app' />} />
        <Route path="/inventory-app/items" element={<InventoryCategories next={'/inventory-app/sources'} prev='/inventory-app/config' />} />
        <Route path="/inventory-app/sources" element={<DataSources next={'/inventory-app/categories'} prev='/inventory-app/items' />} />
        <Route path="/inventory-app/categories" element={<ValueChainCategories next={'/inventory-app/questionnaires'} prev='/inventory-app/sources' />} />
        <Route path="/inventory-app/questionnaires" element={<Questionnaires prev='/inventory-app/categories'/>} />
        <Route path="/inventory-app/help" element={<Help />} />
      </>
    );
  }
}

export const inventoryConfigApp: InventoryConfigApp = new InventoryConfigApp();