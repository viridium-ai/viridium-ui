

import { Route } from "react-router-dom";

import { TreeViewDemo } from "./tree-view";

import './demo-app.css';
import { MicroApp, RouteItem } from "../../components/v-common/v-app";

class DemoApp extends MicroApp {

  public getTitle = () => {
    return "Component Demo";
  }

  public isSecure = () => {
    return false;
  };
  public getName = () => {
    return "demo-app";
  }

  public getRouteItems = () => {
    return [
    new RouteItem().init("Tree View", "Tree View", "Demo", "/demo-app/tree-view"),
    new RouteItem().init("Help", "Help", undefined, "/demo-app/help")
  ];
  }

  public getRoutes = () => {
    return (
      <>
        <Route path="/demo-app/" element={<TreeViewDemo />} />
        <Route path="/demo-app/tree-view" element={<TreeViewDemo />} />
      </>
    );
  }
}


export const demoApp: DemoApp = new DemoApp();