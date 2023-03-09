import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "components/v-common/v-app";
import { ENTITIES, SchemaBrowser } from "./pages/schema-browser";
import "./knowledge-app.css"
import { Help } from "./pages/help";
class KnowledgeApp extends MicroApp {
    public getName = () => {
        return "knowledge-app";
    }
    public getTitle = (): string => {
        return "Viridium Knowledge Base";
    }

    public isSecure = () => false;
    public getRouteItems = () => {
        return [
            new RouteItem().init("Services", "Services", "2", "/service-app"),
            new RouteItem().init("Schema", "Schema", "2", "/knowledge-app/schema"),
            new RouteItem().init("Help", "Help", "2", "/knowledge-app/help")
        ];
    }

    public getRoutes = () => {
        return (
            <>
                <Route key={`knowledge_default`} path={`/knowledge-app`} element={<Help />} />
                <Route key={`knowledge_help`} path={`/knowledge-app/help`} element={<Help />} />
                <Route key={`knowledge_help`} path={`/knowledge-app/schema`} element={<SchemaBrowser entityName={"Emission"} />} />
                {ENTITIES.map((entityName, idx: number) => {
                    return <Route key={`schema_route_${entityName}`} path={`/knowledge-app/schema/${entityName}`} element={<SchemaBrowser entityName={entityName} />} />
                }
                )}
            </>
        )
    }
}

export const knowledgeApp = new KnowledgeApp();
