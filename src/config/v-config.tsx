
import { localCache } from "components/v-utils/v-cache-manager";
import { StringUtils } from "components/v-utils/v-string-utils";
import { Company } from "../micro-apps/viridium-model";

export class EventManager {
    handlers: Map<string, Array<Function>> = new Map();
    publish = (eventName: string, event: {}) => {
        if (this.handlers.get(eventName)) {
            this.handlers.get(eventName)?.forEach(s => s(event));
        }

    }
    subscribe = (eventName: string, handler: Function) => {
        let subscribers = this.handlers.get(eventName);
        if (!subscribers) {
            subscribers = new Array<Function>();
            this.handlers.set(eventName, subscribers);
        }
        subscribers.push(handler);
    }
    unsubscribe = (eventName: string, handler: any) => {
        let subscribers = this.handlers.get(eventName);
        if (subscribers) {
            subscribers.filter(s => s === handler);
        }
    }
}

export const eventManager = new EventManager();

export const getConfigs = (): any => {
    let cachedConfigs = localCache.get("Viridium.Config");
    let configs = require("./configs.json");
    if (cachedConfigs === undefined || cachedConfigs.version !== configs.version ) {
        localCache.set("Viridium.Config", configs);
        cachedConfigs = configs;
    }
    return cachedConfigs;
}


export const getValueChainConfigs = (): any => {
    let cached = localCache.get("ValueChainTemplates.Config");
    if (cached === undefined) {
        cached = require("./value-chain-templates.json");
        localCache.set("ValueChainTemplates.Config", cached);
    } else {
        let configs = require("./value-chain-templates.json");
        let cachedVersion = parseFloat(cached.version);
        let seededVersion = parseFloat(configs.version);
        //we need merge TODO
        if (seededVersion > cachedVersion) {
            localCache.set("ValueChainTemplates.Config", configs);
        }
        cached = configs;
    }
    return cached;
}

interface Accountable {
    value:string,
    description?:string,
    label?:string
}

export const getValueChainAccountable = () => {
    return getValueChainConfigs()["accountable"] as Array<Accountable>;
}
interface Template {
    name?:string,
    description?:string,
    label?:string,
    value : string,
    children?:Array<Template>
}

interface TreeNode {
    id:string,
    value : string;
    text : string;
    children : Array<TreeNode>
}
interface ValueChainTemplate {
    name:string,
    valueChain: TreeNode;
}

export const getValueChainTemplates = () : Array<ValueChainTemplate>=> {
    let templates = getValueChainConfigs()["templates"] as Array<Template>;
    return templates.map((template)=> {
        return {
            name:template.name,
            valueChain: toTreeNode(template)
        } as ValueChainTemplate
    })
}
export const _getTreeData = () => {
    let valueChain = getValueChainConfigs();
    return toTreeNode(valueChain);
}

export const toTreeNode = (taxonomyNode: any) => {
    let children = taxonomyNode["children"];
    return {
        id: taxonomyNode["value"],
        value:taxonomyNode["value"],
        text: StringUtils.t(taxonomyNode["value"]),
        selectable: children === undefined || children.length === 0,
        children: children ? children.map((node: any) => {
            return toTreeNode(node)
        }) : []
    }
}

export const updateConfigs = (configs: any) => {
    localCache.set("Viridium.Config", configs);
    eventManager.publish("cached-updated", getConfigs());
}

export const clearCachedConfigs = () => {
    localCache.remove("Viridium.Config");
    eventManager.publish("cached-cleared", getConfigs());
}

export const updateCompany = (company: Company) => {
    let configs = getConfigs();
    let c = configs.companies.find((c: Company) => c.name === company.name);
    if (c === undefined) {
        c = Company.new(company);
        configs.companies.push(c);
    } else {
        c = Company.new(company);
        configs.companies = configs.companies.filter((c: Company) => c.name !== company.name);
        configs.companies.push(c);
    }
    updateConfigs(configs);
    if (c) {
        localCache.set("Company" + c.id, c);
        localCache.set("Company", c);
    }
    return c;
}

export const getCompany = (id: string | undefined = undefined) => {
    if (id === undefined) {
        let c = localCache.get("Company");
        return c !== undefined ? Company.new(c) : undefined;
    }
    return Company.new(localCache.get("Company" + id));
}
export const getCountry = (code: string) => {
    let countries = getConfigs()["countries"];
    let country = countries.find((c: any) => c.code === code);
    if (country) {
        return country.name;
    } else {
        return code;
    }
}

export const saveState = (id: string, entity: any) => {
    localCache.set(id, entity);
}

export const getState = (id: string, defaultEntity: any) => {
    return localCache.get(id, defaultEntity);
}
