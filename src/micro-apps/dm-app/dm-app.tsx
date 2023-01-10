import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/micro-app";
import { Dashboard } from "./dashboard";
import { SourceManager } from "./source-manager";
import { Help } from "./help";
import { Analytics } from "./analytics";
import './dm-app.css';
import { Scheduler } from "./scheduler";
import { ConnectManagerView } from "./connector-manager";
class DataSourceManager implements MicroApp {

  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Dashboard", "Dashboard", "Data Management", "/dm-app/dashboard"),
    new RouteItem().init("Data Sources", "Source", "Data Management", "/dm-app/source"),
    new RouteItem().init("Connectors", "Connector", "Data Management", "/dm-app/connectors"),
    new RouteItem().init("Scheduler", "Scheduler", "Data Management", "/dm-app/scheduler"),
    new RouteItem().init("Reports", "Reports", "Data Management", "/dm-app/analytics"),
    new RouteItem().init("Help", "Help", "Data Management", "/dm-app/help")
  ];

  public getTitle = () => {
    return "Viridium Data Manager";
  }
  
  public getName = () => {
    return "dm-app";
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
        <Route path="/dm-app" element={<Dashboard />} />
        <Route path="/dm-app/dashboard" element={<Dashboard />} />
        <Route path="/dm-app/source" element={<SourceManager />} />
        <Route path="/dm-app/connectors" element={<ConnectManagerView />} />
        <Route path="/dm-app/scheduler" element={<Scheduler />} />
        <Route path="/dm-app/analytics" element={<Analytics />} />
        <Route path="/dm-app/help" element={<Help />} />
      </>
    );

  }
}

export const dataSourceManager: DataSourceManager = new DataSourceManager();