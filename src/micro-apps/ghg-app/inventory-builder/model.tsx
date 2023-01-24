import { FieldDefinition } from "../../../components/v-form/entity-form";

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
    static newFields = () => {
        return [
            FieldDefinition.new("name", "string", "Name", "Name", false ),
            FieldDefinition.new("description", "string", "Description", "Description", false ),
            FieldDefinition.new("industry", "string", "Industry", "Industry", false ),
            FieldDefinition.options("country", "Country", "Country", 
            [
                {name:"us", label:"United State", value : "us"},
                {name:"china", label:"China", value : "china"}
            ])
        ]
    }
    getAddress = () => {
        return this.street1 + " " + this.city + " " + this.state + " " + this.zipCode;
    }

    getSite = (siteId : string) => {
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
    id: string = "";
    companyId: string = "";
    name: string = "";
    type: string = "";
    description = "";
    addressId: string = "";
    location : string = "";
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
    company?: Company = new Company();
    description: string = "";
    items: Array<InventoryItem> = [];
    addItem = (item: InventoryItem) => {
        item.companyId = this.company!.id;
        this.items.push(item);
    }
    static new = (data: any) => {
        if (data) {
            const c = new Inventory();
            Object.assign(c, data);
            c.items = data.items?.map((d: any) => {
                return InventoryItem.new(d);
            });
            c.company = Company.new(data.company);
            return c;
        } else {
            return new Inventory();
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

