import { Route } from "react-router-dom";

import { DataCollectionWizard } from "./flow-steps/company-summary";
import {ValueChainConfig } from "./flow-steps/value-chain-categories";

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
    new RouteItem().init("Value Chain Config", "Inventory Config", "2", "/inventory-app"),
    new RouteItem().init("Data Manager", "Data Manager", "2", "/dm-app"),
    new RouteItem().init("GHG Reports", "GHG Reports", "2", "/ghg-app"),
    new RouteItem().init("Sign out", "Sign out", "2", "/signout"),
  ];

  public getRoutes = () => {
    return (
      <>
        <Route path="/inventory-app" element={<DataCollectionWizard next={'/inventory-app/categories'} />} />
        <Route path="/inventory-app/config" element={<DataCollectionWizard next={'/inventory-app/categories'} />} />
         <Route path="/inventory-app/categories" element={<ValueChainConfig prev='/inventory-app/config' />} />
      </>
    );
  }
}

export const inventoryConfigApp: InventoryConfigApp = new InventoryConfigApp();