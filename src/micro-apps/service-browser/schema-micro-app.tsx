import { restClient } from '../../common/rest-client';
import { localCache } from '../../utils/cache-manager';
import { Schema, objectToArray, Service } from './schema-types';
import { MicroApp } from "../../common/micro-app";

class SchemaApp implements MicroApp {

    public getApiDoc = (callback : any = undefined) => {
        let res = localCache.get('/v3/api-docs');
        if (res) {
            if (callback) {
                callback(res);
            }
            return res;
        }
        //TODO
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

    public getName = () => {
        return "schema-app";
    }
    public getTitle = (): string => {
        return "Schema Browser";
    }

    public toPayload(schemaName: string, entity: any, mode: string): any {
        if (mode === 'create') {
            delete entity["id"]
        }
        return entity;
    }

    public getSchemas(): Schema[] {
        let schemas = objectToArray(this.getApiDoc().components.schemas)
            .map((s: any) => {
                let schema = new Schema();
                Object.assign(schema, s);
                return schema;
            });
        return schemas;
    }

    public getNavItems = () => {
        return this.getServices()
            .filter(service => {
              return  service.getSchema() && service.depth === 2
            });
    }

    public getRouteItems = () => {
        return [];
    }

    public getRoutes = () => {
        return (
            <>
                {this.getNavItems().map((service: Service, idx: number) => service.route())}
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

export const schemaApp = new SchemaApp();