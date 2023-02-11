import { Route } from "react-router-dom";
import { ServiceBrowser } from "./services-ui";
import { serviceApp } from './service-micro-app';
import { FieldDef } from '../../components/v-entity/entity-form';
import { IRouteItem } from "../../components/v-common/v-app";
import { StringUtils } from "../../components/v-utils/v-string-utils";



export class SchemaProperty {
    name?: string;
    type?: string;
    format?: string;
}

export const objectToArray = (obj: any): Array<any> => {
    const keys = Object.keys(obj);
    return keys.map((key: string) => {
        let newObj: any = {};
        newObj.name = key;
        Object.assign(newObj, obj[key as keyof typeof obj]);
        return newObj;
    })
}

const noneUiFields: Array<string> = [
    'id', 'tenantId',  'tenantKey', 'dateUpdated', 'updatedBy', 'dateCreated', 'createdBy', 'active', 'deleted', 'text'
]

export class Service implements IRouteItem {
    name: string = '';
    label: Function | string | undefined = () => {
        return StringUtils.t(this.name);
    };

    group?: string;

    elements: Array<string> = [];
    depth: number = 0;
    path?: string;

    icon?: string;
    type?: string;
    route: any;

    public getLabel(): string {
        if(this.label instanceof Function) {
            return this.label();
        }
        else if(this.label) {
            return this.label;
        }
        else {
            return this.name;
        }
    }
    
    public static new(path: any): Service {
        let service = new Service();
        // /sales/products
        let paths = path.name.split('/');
        paths.shift();
        service.group = paths[0];
        service.name = paths[1];
        service.depth = paths.length;
        service.path = path.name;
        service.route = () => {
            return (
                <Route key={`service_route_${service.name}`} path={`/service/${service.name}`} element={<ServiceBrowser service={service} />} />
            )
        };
        return service;
    }
    public getSchema(): ServiceSchema | undefined {
        return serviceApp.getSchemas().find((schema) => {
            return this.name === schema.getServiceName();
        });
    }

}

export class ServiceSchema {
    name: string = '';
    type?: string;
    properties: any;

    public getName(): string {
        return this.name;
    }

    public getServiceName(): string {
        return StringUtils.plural(this.name.toLocaleLowerCase());
    }

    public getFieldDefs(): Array<FieldDef> {
        let props = objectToArray(this.properties);
        return props.filter((p: any) => {
            return !noneUiFields.includes(p.name);
        }).map((p: any) => {
            let fd;
            if (p.type) {
                fd = FieldDef.new(p.name, p.type);
                
            } else {
                fd = FieldDef.new(p.name);
                fd.options = p.$ref;
            }
            return fd;
        })
    }

    public getEmptyObject(): any {
        let props = objectToArray(this.properties);
        let obj: any = {};

        props.forEach((p: any) => {
            obj[p.name] = null;
        });
        return obj;
    }

    public getLabel() {
        return StringUtils.t(this.name);
    }
}