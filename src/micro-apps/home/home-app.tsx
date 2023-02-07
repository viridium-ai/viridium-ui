

import { Route } from "react-router-dom";
import { Industries } from "./industries";
import { Products } from "./products";
import { AboutUs } from "./about-us";
import { WelcomePage } from "./welcome";
import './home-app.css';
import { Help } from "./help";
import { MicroApp, RouteItem } from "../../components/v-common/v-app";
import { securityManager } from "../../components/v-security/v-security-manager";

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

  public routeItems: Array<RouteItem> = [
    new RouteItem().init("Inventory Config", "Inventory Config", "1", "/inventory-app"),
    new RouteItem().init("Data Manager", "Data Manager", "1", "/dm-app"),
    new RouteItem().init("GHG Reports", "GHG Reports", "1", "/ghg-app"),
    new RouteItem().init("Help", "Help", "1", "/help"),

    new RouteItem().init("Sign out", "Sign out", "2", "/signout"),
  ];

  private routeItems1: Array<RouteItem> = [
    new RouteItem().init("Products & Solutions", "Products", "1", "/products"),
    new RouteItem().init("Industries", "Industries", "1", "/industries"),
    new RouteItem().init("About us", "About us", "1", "/about-us"),

    new RouteItem().init("Sign in", "Sign in", "2", "/login?from=/dm-app/dashboard"),
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
        <Route path="/help" element={<Help />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/industries" element={<Industries />} />
      </>
    );
  }
}

export const homeApp: HomeApp = new HomeApp();