
import { StringUtils } from '../../utils/v-string-utils';
import { Route } from "react-router-dom";
import { SchemaBrowser } from "./services-ui";
import { IRouteItem } from "../../common/v-app";
import { schemaApp } from './schema-micro-app';

export class FieldValue {
    value: any = undefined;
    definition?: FieldDefinition;
}

export class FieldDefinition {
    name: string = '';
    type: string = '';

    format?: Function | string;

    label: string = '';
    placeHolder: string = '';

    readonly?: boolean = false;
    updatable?: boolean;
    required?: boolean = false;

    validator?: Function | undefined;
    listOfValues?: Function | [] | undefined;

    public value = (value: any) => {
        return {
            value: value,
            definition: this
        } as FieldValue;
    }

    public getLabel = () => {
        return StringUtils.t(this.name);
    }

    public getPlaceHolder = () => {
        return this.placeHolder === '' ? this.getLabel() : this.placeHolder;
    }

    public getType = () => {
        //console.log(this);
        return (this.type === 'string' && this.format === 'date-time') ? 'date' : this.type;
    }

    public static new(name: string, type: string, label = '', placeHolder = '', readonly = false, validator: Function | undefined = undefined) {
        let field = new FieldDefinition();
        field.name = name;
        field.type = type;
        field.label = label;
        field.placeHolder = placeHolder;
        field.readonly = readonly;
        field.validator = validator;
        return field;
    }
}

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
                <Route key={`service_route_${service.name}`} path={`/schema/${service.name}`} element={<SchemaBrowser service={service} />} />
            )
        };
        return service;
    }
    public getSchema(): Schema | undefined {
        return schemaApp.getSchemas().find((schema) => {
            return this.name === schema.getServiceName();
        });
    }

}

export class Schema {
    name: string = '';
    type?: string;
    properties: any;

    public getName(): string {
        return this.name;
    }

    public getServiceName(): string {
        return StringUtils.plural(this.name.toLocaleLowerCase());
    }

    public getFieldDefs(): Array<FieldDefinition> {
        let props = objectToArray(this.properties);
        return props.filter((p: any) => {
            return !noneUiFields.includes(p.name);
        }).map((p: any) => {
            let fd;
            if (p.type) {
                fd = FieldDefinition.new(p.name, p.type);
                fd.format = p.format;
            } else {
                fd = FieldDefinition.new(p.name, 'lov');
                fd.listOfValues = p.$ref;
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