import { Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { SourceManager } from "./pages/source-manager";
import { ReportConfigPage } from "./pages/report-page";
import './dm-app.css';
import { SchedulerPage } from "./pages/scheduler-page";
import { ConnectManagerView } from "./pages/connector-manager";
import { MicroApp, RouteItem } from "components/v-common/v-app";


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