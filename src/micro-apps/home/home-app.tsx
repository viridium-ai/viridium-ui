

import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/v-app";
import { About } from "./about";
import { Industries } from "./industries";
import { Products } from "./products";
import { ContactUs } from "./about-us";
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

  public routeItems: Array<RouteItem> = [
    new RouteItem().init("Inventory Config", "Inventory Config", "1", "/inventory-app"),
    new RouteItem().init("Data Manager", "Data Manager", "1", "/dm-app"),
    new RouteItem().init("GHG Reports", "GHG Reports", "1", "/ghg-app"),
    new RouteItem().init("Sign out", "Sign out", "2", "/signout"),
  ];

  private routeItems1: Array<RouteItem> = [
    new RouteItem().init("Products & Solutions", "Products", "1", "/products"),
    new RouteItem().init("Industries", "Industries", "1", "/industries"),
    new RouteItem().init("Contact us", "Contact us", "1", "/contact-us"),

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
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/about" element={<About />} />
      </>
    );
  }
}

export const homeApp: HomeApp = new HomeApp();