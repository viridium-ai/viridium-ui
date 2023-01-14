import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/v-app";

import { DataSources } from "./flow-steps/data-sources";
import { DataCollectionWizard } from "./flow-steps/company-summary";
import { ValueChainCategories } from "./flow-steps/value-chain-categories";
import { Questionnaires } from "./flow-steps/questionnaires";
import { Help } from "./help";
import { InventoryCategories } from "./flow-steps/inventory-categories";
import { InventoryConfig } from "./flow-steps/inventory-config";
import './inventory-app.css';

class InventoryConfigApp extends MicroApp {

  public getTitle = () => {
    return "Inventory App"
  }

  public getName = () => {
    return "inventory-app";
  }

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Help", "Help", undefined, "/inventory-app/help")
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