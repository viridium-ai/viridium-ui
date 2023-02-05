import { securityManager } from "../../../common/security/v-security-manager";
import { FieldDef, ValueType } from "../../../components/v-entity/entity-form";

import { getConfigs } from "../../../config/v-config";

export class Address {
    id = "";
    streetNo?: string;
    city?: string;
    state?: string;
    country = "US";
    zipCode?: string;
}

export class Company {
    id: string = crypto.randomUUID().substring(0,8);
    name: string = "";
    description: string = "";
    industry?: string;
    viridiumCategory?: string;
    lastUpdatedDate?: Date;
    createdAt? : Date;
    createdBy? : string;
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
    inventory?: Inventory;
    clone = () => {
        return Company.new(this);
    }
    static new = (data: any) => {
        if (data) {
            const c = new Company();
            Object.assign(c, data);
            if (data.sizes) {
                c.sites = data.sites.map((d: any) => {
                    return Site.new(d);
                })
            };
            c.inventory = new Inventory(c.id);
            if (data.inventory) {
                Object.assign(c.inventory, data.inventory);
            }
            c.createdAt = new Date();
            c.createdBy = securityManager.getUserName();
            return c;
        }
        return new Company();
    }
    static newFields = () => {
        let configs = getConfigs();
        let industries = configs.industries ? configs.industries : [{ name: "NA" }];
        let countries = configs.countries ? configs.countries : [
            { name: "us", label: "United State", value: "us" },
            { name: "china", label: "China", value: "china" }
        ];
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.select("industry",
                industries.map((i: any) => { return { name: i.name, label: i.name, value: i.name } })),
            FieldDef.new("firstName"),
            FieldDef.new("lastName"),
            FieldDef.new("street1"),
            FieldDef.new("zipCode"),
            FieldDef.new("city"),
            FieldDef.new("state"),
            FieldDef.select("country",
                countries.map((c: any) => { return { name: c.name, label: c.name, value: c.code } }))
                .useDefault("US")
        ]
    }
    getAddress = () => {
        return this.street1 + " " + this.city + " " + this.state + " " + this.zipCode;
    }

    getSite = (siteId: string) => {
        return this.sites?.find((s) => s.id === siteId);
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
                    { type: "text", text: site.location }
                    ]
                }
            }
            )
        }
    }
}

export class Site {
    id: string = crypto.randomUUID().substring(0, 8);
    companyId: string = "";
    name: string = "";
    type: string = "";
    description = "";
    addressId: string = "";
    location: string = "";
    getAddress = () => {
        return this.location;
    }
    static new = (data: any) => {
        if (data) {
            const c = new Site();
            Object.assign(c, data);
            return c;
        }
    }
    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.new("location")
        ]
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
    type: string = "";
    context: string = ""; //corporation, product, activity 
    description: string = "";
    items: Array<InventoryItem> = [];
    companyId: string = "";
    constructor(companyId: string) {
        this.companyId = companyId;
    }
    addItem = (item: InventoryItem) => {
        item.companyId = this.companyId;
        this.items.push(item);
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

