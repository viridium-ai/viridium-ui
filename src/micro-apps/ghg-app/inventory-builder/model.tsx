import { localCache } from "../../../utils/cache-manager";


export const getConfigs = (): any => {
    let configs = localCache.get("Inventory.Config");
    if (configs === undefined) {
        configs = require("./configs.json");
        localCache.set("Inventory.Config", configs);
    }
    return configs;
}

export const updateConfigs = (config: any) => {
    localCache.set("Inventory.Config", config);
}

export const updateInventory = (inventory: Inventory) => {
    localCache.set("Inventory", inventory);
}

export const getInventory = () => {
    return localCache.get("Inventory", new Inventory())
}

export class Address {
    id = "";
    streetNo?: string;
    city?: string;
    state?: string;
    country = "US";
    zipCode?: string;
}

export class Company {
    id: string = "";
    name: string = "";
    description: string = "";
    industry?: string;
    viridiumCategory?: string;
    lastUpdatedDate?: Date;
    lastUpdatedBy?: string;
    sourceId?: string;
    source?: string;
    street1?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    sites : Array<Site> = [];
    getAddress = () => {
        return this.street1 + " " + this.city + " " + this.state + " " + this.zipCode;
    }
}

export class Site {
    id: string = "";
    companyId: string = "";
    name: string = "";
    type: string = "";
    description = "";
    addressId: string = ""
}

export class Vendor {
    id = "";
    name = "";
    description = "";
}

export class Inventory {
    id = "";
    companyId: string = "Test";
    standard: string = "";
    regulation: string = "";
    scope: string = ""; //1, 2, 3
    type: string = "";
    context: string = ""; //corporation, product, activity 
    company: Company = new Company();
    description: string = "";
    items: Array<InventoryItem> = [];
}

export class InventoryCategory {
    id = "";
    name = "";
    scope = "1";
}

export class InventoryType {
    id = "";
    name = "";
    categoryId = "1";
    txType = "0";
    vendor = ""
}

export class InventoryItem {
    id = crypto.randomUUID();
    name = "";
    typeId = "";
    siteId = "";
    quantity: number = 0;
    frequency = "yearly"
}

export class EmissionFactor {
    id = "";
    name = "";
    standard = "";
    category = "";
    factory: number = 0;
    type = ""
}

export class InvetoryTypeFactorMapping {
    id = "";
    factorId = "";
    typeId = "";
}

export class EmissionType {
    id = "";
    name = "";
    ratioToCO2: number = 1;
}

