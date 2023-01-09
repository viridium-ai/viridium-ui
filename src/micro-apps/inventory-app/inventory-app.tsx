import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/micro-app";
import './inventory-app.css';
import { DataSources } from "./wizard-steps/sources";
import { DataCollectionWizard } from "./wizard-steps/summary";
import { FunctionCategories } from "./wizard-steps/categories";
import { Questionnaires } from "./wizard-steps/questionnaires";
import { Help } from "./help";
import { InventoryItems } from "./wizard-steps/items";
import { InventoryConfig } from "./wizard-steps/config";



class InventoryConfigApp implements MicroApp {
 

  public getTitle = () => {
    return "VIRIDIUM.AI"
  }

  public getName = () => {
    return "inventory-app";
  }

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Help", "Help", undefined, "/inventory-app/help"),
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
        <Route path="/inventory-app" element={<DataCollectionWizard  />} />
        <Route path="/inventory-app/config" element={<InventoryConfig />} />
        <Route path="/inventory-app/items" element={<InventoryItems />} />
        <Route path="/inventory-app/sources" element={<DataSources />} />
        <Route path="/inventory-app/categories" element={<FunctionCategories />} />
        <Route path="/inventory-app/questionnairs" element={<Questionnaires/>} />
        <Route path="/inventory-app/help" element={<Help />} />
      </>
    );
  }
  
}

export const inventoryConfigApp: InventoryConfigApp = new InventoryConfigApp();