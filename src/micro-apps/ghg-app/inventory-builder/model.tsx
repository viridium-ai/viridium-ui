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

export const updateCompany = (company?: Company) => {
    if (company) {
        localCache.set("Company" + company.id, company);
        localCache.set("Company", company);
    }
}

export const getCompany = (id: string | undefined = undefined) => {
    if (id === undefined) {
        return localCache.get("Company");
    }
    return localCache.get("Company" + id)
}
export const updateInventory = (inv : Inventory) => {

    return localCache.set("Inventory", inv);
}
 
export const getInventory = () => {

    return localCache.get("Inventory")
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
    sites: Array<Site> = [];
    inventories: Array<Inventory> = [];
    static new = (data: any) => {
        if (data) {
            const c = new Company();
            Object.assign(c, data);
            c.sites = data.sites.map((d: any) => {
                return Site.new(d);
            })
            c.inventories = data.inventories?data.inventories.map((i: any) => {
                return Inventory.new(i);
            }) : [];
            return c;
        }
    }
    getAddress = () => {
        return this.street1 + " " + this.city + " " + this.state + " " + this.zipCode;
    }
    getInventory = (scope: string) => {
        return this.inventories.find((inventory) => inventory.scope === scope);
    }
    getSitesData = () => {
        return {
            id: this.id,
            headers: [
                { type: "text", text: "Id" },
                { type: "text", text: "Name" },
                { type: "text", text: "Location" }
            ],
            rows: this.sites.map((site, idx) => {
                return {
                    id: site.id,
                    cols: [{ type: "text", text: site.id },
                    { type: "text", text: site.name },
                    { type: "text", text: site.getAddress() }
                    ]
                }
            }
            )
        }
    }
}

export class Site {
    id: string = "";
    companyId: string = "";
    name: string = "";
    type: string = "";
    description = "";
    addressId: string = ""
    getAddress = () => {
        return this.addressId;
    }
    static new = (data: any) => {
        if (data) {
            const c = new Site();
            Object.assign(c, data);
            return c;
        }
    }
}

export class Vendor {
    id = "";
    name = "";
    description = "";
}

export class Inventory {
    id = crypto.randomUUID();
    standard: string = "";
    regulation: string = "";
    scope: string = ""; //1, 2, 3
    type: string = "";
    context: string = ""; //corporation, product, activity 
    company: Company = new Company();
    description: string = "";
    items: Array<InventoryItem> = [];
    addItem = (item: InventoryItem) => {
        item.companyId = this.company.id;
        item.scope = this.scope;
        this.items.push(item);
    }
    static new = (data: any) => {
        if (data) {
            const c = new Inventory();
            Object.assign(c, data);
            c.items = data.items?.map((d: any) => {
                return InventoryItem.new(d);
            });
            return c;
        }

    }
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
    companyId = "";
    siteId = "";
    name = "";
    scope = "";
    category = "";
    unit = "";
    typeId = "";
    quantity: number = 0;
    frequency = "yearly";
    static new = (data: any) => {
        const c = new InventoryItem();
        Object.assign(c, data);
        return c;
    }
}

export class EmissionFactor {
    id = "";
    name = "";
    standard = "";
    category = "";
    factory: number = 0;
    type = ""
}

export class InventoryTypeFactorMapping {
    id = "";
    factorId = "";
    typeId = "";
}

export class EmissionType {
    id = "";
    name = "";
    ratioToCO2: number = 1;
}

