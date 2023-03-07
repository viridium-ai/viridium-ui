import { Route } from "react-router-dom";
import { ServiceBrowser } from "./services-page";
import { serviceApp } from './service-app';
import { FieldDef } from 'components/v-entity/entity-form';
import { IRouteItem } from "components/v-common/v-app";
import { StringUtils } from "components/v-utils/v-string-utils";
import { INavItem } from "components/v-layout/v-layout";
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
    'id', 'tenantId', 'tenantKey', 'dateUpdated', 'updatedBy', 'updatedOn','originCorrelationId',
    'dateCreated', 'createdBy', 'active', 'deleted', 'text', "createdOn", "modifiedOn", "statusCode", "stateCode",
    "importSequenceNumber", "overriddenCreatedOn", "timeZoneRuleVersionNumber", "utcConversionTimeZoneCode", "ttlInSeconds",
    "description", "originalCorrelationId"
]
export class Service implements IRouteItem {
    name: string = '';
    label: Function | string | undefined = () => {
        let label = (this.name.replaceAll("-", " "));
        return label[0].toLocaleUpperCase() + label.slice(1);
    };

    group?: string;

    elements: Array<string> = [];
    depth: number = 0;
    path?: string;

    icon?: string;
    type?: string;
    route: any;

    public getLabel(): string {
        if (this.label instanceof Function) {
            return this.label();
        }
        else if (this.label) {
            return this.label;
        }
        else {
            return this.name;
        }
    }

    public toNavItem = () => {
        return {
            name: this.name,
            route: `/service-app/${this.name}`,
            label: this.getLabel()
        } as INavItem
    }

    public static new(path: any): Service {
        let service = new Service();
        let paths = path.name.split('/');
        paths.shift();
        service.group = paths[0];
        service.name = paths[1];
        service.depth = paths.length;
        service.path = path.name;
        service.route = () => {
            let path = `/service-app/${service.name}`;
            return (
                <Route key={`service_route_${service.name}`} path={path} element={<ServiceBrowser service={service} />} />
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
    public getServiceName() {
        return this.name.replace(/([A-Z])/g, "-$1").slice(1).toLowerCase();
    }
    public getFieldDefs(): Array<FieldDef> {
        let props = objectToArray(this.properties).filter((p: any) => {
            return !noneUiFields.includes(p.name)
                && (p.name.toUpperCase() !== (this.name + "Id").toUpperCase());
        });
        return props.map((p: any) => {
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
    public validate(obj: any): Array<string> {
        let props = this.getFieldDefs();
        let errors: Array<string> = [];
        props.forEach((p: any) => {
            if (p.required && !obj[p.name]) {
                errors.push(`${StringUtils.t(p.name)} is required`);
            } 
            p.validate(obj[p.name], (err: string) => {
                errors.push(err);
            });
        })
        return errors;
    }
    public getEmptyObject(): any {
        let props = objectToArray(this.properties).filter((p: any) => {
            return !noneUiFields.includes(p.name)
                && (p.name.toUpperCase() !== (this.name + "Id").toUpperCase());
        });
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