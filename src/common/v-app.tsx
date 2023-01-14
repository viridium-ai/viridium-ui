import { StringUtils } from '../utils/v-string-utils';

export interface IMicroApp {
    getRouteItems () : IRouteItem[];
    getNavItems() : IRouteItem[];
    getRoutes() : any;
    getName () : string;
    getTitle () : string;
    getHeader () : {visible:boolean, title:string};
    isSecure () : boolean;
}

export abstract class MicroApp implements IMicroApp {
    getRouteItems(): IRouteItem[] {
        throw new Error('Method not implemented.');
    }
    getNavItems(): IRouteItem[] {
        throw new Error('Method not implemented.');
    }
    getRoutes() {
        throw new Error('Method not implemented.');
    }
    
    getName(): string {
        throw new Error('Method not implemented.');
    }
    getTitle () : string {
        return this.getName();
    }
    getHeader = () : any  =>{
        return {
            title:this.getTitle(),
            visible:true
        };
    }

    isSecure = () => {
        return true;
    }
}

export interface IRouteItem {
    name: string,
    label: Function|string|undefined,
    icon?: string,
    type?: string,
    route: any,
    getLabel() : string
}

export interface Action {
    name: string,
    action?: Function,
    icon?: string,
    type?: string,
    actions?: Array<Action>
}


export interface TitleProp {
    title: string,
    actions?: Array<Action>
}

export class RouteItem implements IRouteItem {
    name: string = '';
    label: Function | string | undefined = undefined;
    group?: string;
    icon?: string;
    route: any;

    public getLabel(): string {
        if(this.label instanceof Function) {
            return this.label();
        }
        else if(this.label) {
            return this.label;
        }
        else {
            return StringUtils.t(this.name)!;
        }
    }
    
    public init(name : string, label : any = undefined, group : string | undefined = undefined, route : any = undefined) : RouteItem{
        this.group = group;
        this.name = name; 
        this.label = label;
        this.route = route;
        return this;
    }
}