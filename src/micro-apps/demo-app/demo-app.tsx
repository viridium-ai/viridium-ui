

import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/micro-app";
import { Help } from "./help";

import { TreeViewDemo } from "./tree-view";

import './demo-app.css';

class DemoApp implements MicroApp {

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Tree View", "Tree View", "Demo", "/demo-app/tree-view"),
    new RouteItem().init("Help", "Help", undefined, "/demo-app/help")
  ];

  public getTitle = () => {
    return "Component Demo";
  }

  public getName = () => {
    return "demo-app";
  }
  public getRouteItems = () => {
    return this.routeItems;
  }

  public getNavItems = () => {
    return [];
  }

  public getRoutes = () => {

    return (
      <>
        <Route path="/demo-app/" element={<TreeViewDemo />} />
        <Route path="/demo-app/tree-view" element={<TreeViewDemo />} />
        <Route path="/demo-app/help" element={<Help />} />
      </>
    );

  }
}


export const demoApp: DemoApp = new DemoApp();