

import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/v-app";
import { About } from "./about";
import { Industries } from "./industries";
import { Products } from "./products";
import { Solutions } from "./solutions";
import { WelcomePage } from "./welcome";
import './home-app.css';
import { securityManager } from "../../common/security/v-security-manager";

class HomeApp extends MicroApp {
  
  public getName = () => {
    return "home-app";
  }
  public isSecure = () : boolean =>  {
    return false;
  }

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Inventory Config", "Inventory Config", undefined, "/inventory-app"),
    new RouteItem().init("Data Manager", "Data Manager", undefined, "/dm-app"),
    new RouteItem().init("GHG Reports", "GHG Reports", undefined, "/ghg-app")
  ];

  private routeItems1: Array<RouteItem> = [
    new RouteItem().init("Home", "Home", undefined, "/"),
    new RouteItem().init("Products", "Products", undefined, "/products"),
    new RouteItem().init("Solutions", "Solutions", undefined, "/solutions"),
    new RouteItem().init("Industries", "Industries", undefined, "/industries"),
    new RouteItem().init("Company", "Company", undefined, "/company"),
    new RouteItem().init("Request Demo", "Request Demo", undefined, "/demo-app"),
    new RouteItem().init("Sign In", "Sign In", undefined, "/login?from=/")
  ];


  public getRouteItems = () => {
    return securityManager.isSignedIn() ?this.routeItems : this.routeItems1;
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