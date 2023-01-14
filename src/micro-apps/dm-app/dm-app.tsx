import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/v-app";
import { Dashboard } from "./dashboard";
import { SourceManager } from "./source-manager";
import { Help } from "./help";
import { ReportConfigPage } from "./report-page";
import './dm-app.css';
import { SchedulerPage } from "./scheduler-page";
import { ConnectManagerView } from "./connector-manager";


class DataSourceManager extends MicroApp {
  private routeItems: Array<RouteItem> = [
    new RouteItem().init("Dashboard", "Dashboard", "Data Management", "/dm-app/dashboard"),
    new RouteItem().init("Data Sources", "Source", "Data Management", "/dm-app/sources"),
    new RouteItem().init("Connectors", "Connector", "Data Management", "/dm-app/connectors"),
    new RouteItem().init("Scheduler", "Scheduler", "Data Management", "/dm-app/scheduler"),
    new RouteItem().init("Reports", "Reports", "Data Management", "/dm-app/reports"),
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
        <Route path="/dm-app/sources" element={<SourceManager />} />
        <Route path="/dm-app/connectors" element={<ConnectManagerView />} />
        <Route path="/dm-app/scheduler" element={<SchedulerPage />} />
        <Route path="/dm-app/reports" element={<ReportConfigPage />} />
        <Route path="/dm-app/help" element={<Help />} />
      </>
    );

  }
}

export const dataSourceManager: DataSourceManager = new DataSourceManager();