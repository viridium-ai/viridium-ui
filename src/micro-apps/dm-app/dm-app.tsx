import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/v-app";
import { Dashboard } from "./dashboard";
import { SourceManager } from "./source-manager";
import { ReportConfigPage } from "./report-page";
import './dm-app.css';
import { SchedulerPage } from "./scheduler-page";
import { ConnectManagerView } from "./connector-manager";


class DataSourceManager extends MicroApp {
  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Dashboard", "Dashboard", "2", "/dm-app/dashboard"),
    new RouteItem().init("Data Sources", "Source", "2", "/dm-app/sources"),
    new RouteItem().init("Connectors", "Connector", "2", "/dm-app/connectors"),
    new RouteItem().init("Scheduler", "Scheduler", "2", "/dm-app/scheduler"),
    new RouteItem().init("Reports", "Reports", "2", "/dm-app/reports"),
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
        <Route path="/dm-app/sources" element={<SourceManager />} />
        <Route path="/dm-app/connectors" element={<ConnectManagerView />} />
        <Route path="/dm-app/scheduler" element={<SchedulerPage />} />
        <Route path="/dm-app/reports" element={<ReportConfigPage />} />
      </>
    );

  }
}

export const dataSourceManager: DataSourceManager = new DataSourceManager();