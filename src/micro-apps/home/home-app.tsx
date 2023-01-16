

import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/v-app";
import { About } from "./about";
import { Industries } from "./industries";
import { Products } from "./products";
import { Solutions } from "./solutions";
import { WelcomePage } from "./welcome";
import './home-app.css';
import { securityManager } from "../../common/security/v-security-manager";

export class HomeApp extends MicroApp {

  public getName = () => {
    return "home-app";
  }
  public isSecure = (): boolean => {
    return false;
  }

  getHeader = (): any => {
    return {
      title: this.getTitle(),
      visible: false
    };
  }

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Inventory Config", "Inventory Config", undefined, "/inventory-app"),
    new RouteItem().init("Data Manager", "Data Manager", undefined, "/dm-app"),
    new RouteItem().init("GHG Reports", "GHG Reports", undefined, "/ghg-app")
  ];

  private routeItems1: Array<RouteItem> = [
    new RouteItem().init("Products & Solutions", "Products", "1", "/products"),
    new RouteItem().init("Industries", "Industries", "1", "/industries"),
    new RouteItem().init("Contact us", "Contact us", "1", "/company"),

    new RouteItem().init("Sign in", "Sign in", "2", "/login?from=/"),
    new RouteItem().init("Request Demo", "Request Demo", "2", "/demo-app"),

  ];


  public getRouteItems = () => {
    return securityManager.isSignedIn() ? this.routeItems : this.routeItems1;
  }

  public getNavItems = () => {
    return [];
  }

  public getRoutes = () => {
    return (
      <>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/company" element={<About />} />
      </>
    );
  }
}


export const homeApp: HomeApp = new HomeApp();