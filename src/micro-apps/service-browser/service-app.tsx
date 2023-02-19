import { MicroApp, RouteItem } from "../../components/v-common/v-app";
import { restClient } from "../../components/v-common/v-client";
import { localCache } from "../../components/v-utils/v-cache-manager";
import { ServiceSchema, objectToArray, Service } from "./service-types";
import "./service-app.css"
class ServiceApp extends MicroApp {

    public _getApiDoc = (callback: any = undefined) => {
        let res = localCache.get('/v3/api-docs');
        if (res) {
            if (callback) {
                callback(res);
            }
            return res;
        }
        restClient.get('/v3/api-docs').then((json) => {
            localCache.set('/v3/api-docs', json);
            if (callback) {
                callback(json);
            }
            return json;
        }).catch((error) => {
            console.log("Failed to get api doc", error);
        });
        return undefined;
    }

    public getApiDoc = (callback: any = undefined) => {
        let res = require('./cached.json');
        if (res.value) {
            if (callback) {
                callback(res.value);
            }
            return res.value;
        }
    }

    public getName = () => {
        return "service-app";
    }
    public getTitle = (): string => {
        return "Service Schema Browser";
    }

    public toPayload(schemaName: string, entity: any, mode: string): any {
        if (mode === 'create') {
            delete entity["id"]
        }
        return entity;
    }

    public getSchemas(): ServiceSchema[] {
        let schemas = objectToArray(this.getApiDoc().components.schemas)
            .map((s: any) => {
                let schema = new ServiceSchema();
                Object.assign(schema, s);
                return schema;
            });
        return schemas;
    }

    public getNavItems = () => {
        let items = this.getServices().filter(service => {
            return service.getSchema() && service.depth === 2
        });
        return items;
    }

    public getGroupedNavItems =() => {
        let items = this.getNavItems();
        let groupedItems = [{
            name:"LookUp",
            items:[...items].filter((item)=> item.name[0] === 'a')
        },
        {
            name:"Factory",
            items:[...items].filter((item)=> item.name[0] === 'b')
        },
        {
            name:"Inventory",
            items:[...items].filter((item)=> item.name[0] === 'o')
        }];
        //console.log(groupedItems, items);
        return groupedItems
    }

    public getRouteItems = () => {
        return [
            new RouteItem().init("Services", "Services", "2", "/service/emission"),
            new RouteItem().init("Schema", "Schema", "2", "/knowledge-app/schema"),
            new RouteItem().init("Help", "Help", "2", "/knowledge-app/help")
        ];
    }

    public getRoutes = () => {
        return (
            <>
                {this.getNavItems().map((service) => service.route())}
            </>
        )
    }

    public getServices(): Array<Service> {
        let paths = objectToArray(this.getApiDoc().paths);
        let services = paths.map((path, idx) => {
            return Service.new(path);
        });

        services = services.filter((s) => {
            return !['{*path}',
                'fielddefinitions',
                'entitydefinitions',
                'permissions',
                'roles',
                'grants',
                'users'].includes(s.name!);
        });
        return services;
    }

    public getPath(name: string): string | undefined {
        let paths: Array<string> = Object.keys(this.getApiDoc().paths);
        let path: string | undefined = paths.find(p => {
            return p.indexOf(name.toLowerCase()) !== -1;
        });
        return path;
    }
}

export const serviceApp = new ServiceApp();