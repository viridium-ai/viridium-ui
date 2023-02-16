import { FieldDef, SelectOption, ValueType } from "../components/v-entity/entity-form";
import { EMAIL, Entity, PHONE } from "../components/v-entity/entity-model";
import { securityManager } from "../components/v-security/v-security-manager";
import { StringUtils } from "../components/v-utils/v-string-utils";
import { getCompany, getConfigs, getCountry } from "../config/v-config";
export interface NamedObject {
    id: string,
    name: string
}
export class BaseEntity implements Entity {
    id: string;
    name: string;

    description: string = "";
    validated: boolean;

    createdAt: Date;
    createdBy?: string;
    updatedBy?: string;
    updatedAt?: Date
    constructor() {
        this.id = StringUtils.guid();
        this.name = "";
        this.createdAt = new Date();
        this.validated = false;
    }
}
export class Address extends BaseEntity {
    streetNo?: string;
    city?: string;
    state?: string;
    country = "US";
    zipCode?: string;
}
export class Company extends BaseEntity {
    sector?: string;
    industry?: string;
    symbol?: string;
    marketCap?: number;
    stockPrice?: number;
    revenue?: number;
    viridiumCategory?: string;
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
    numberOfEmployees?: number;
    //stoke info
    stokePrice?: number;
    change?: number;
    volume?: number;
    growth?: number;
    income?: number;
    freeCashflow?: number;
    netCash?: number;
    sites: Array<Site> = [];
    inventories?: Array<Inventory> = [];
    inventory?: Inventory; //inventory current being editted
    clone = () => {
        return Company.new(this);
    }
    static new = (data: any) => {
        if (data) {
            const c = this.defaultEntity();
            Object.assign(c, data);
            if (data.sites) {
                c.sites = data.sites.map((d: any) => {
                    return Site.new(d);
                })
            };
            if (data.inventories) {
                c.inventories = data.inventories.map((d: any) => {
                    return Inventory.new(d);
                });
            };
            c.createdAt = new Date();
            c.createdBy = securityManager.getUserName();
            return c;
        }
        return this.defaultEntity();
    }
    static defaultEntity = () => {
        let newEntity = new Company() as any;
        this.newFields().forEach((def) => {
            newEntity[def.name] = def.defaultValue;
        });
        console.debug("Defaut entity", newEntity);
        return newEntity;
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
            FieldDef.select("industry",
                industries.map((i: any) => { return { name: i.name, label: i.name, value: i.name } })),
            FieldDef.new("sector"),
            FieldDef.new("email").useValidator(EMAIL),
            FieldDef.new("phone").useValidator(PHONE),
            FieldDef.new("street1"),
            FieldDef.new("city"),
            FieldDef.new("state"),
            FieldDef.select("country", countries.map((c: any) => { return { name: c.name, label: c.name, value: c.code } }))
                .useDefault("US")
                .useFormatter(getCountry)
        ]
    }
    getAddress = () => {
        return this.street1 + " " + this.city + " " + this.state + " " + this.zipCode;
    }
    getSite = (siteId: string) => {
        return this.sites?.find((s) => s.id === siteId);
    }
}
export class Site extends BaseEntity {
    companyId: string = "";
    type: string = "";
    addressId: string = "";
    state: string = "";
    country: string = "";
    numberOfEmployees?: number;
    getAddress = () => {
        return this.state + ", " + this.country;
    }
    static new = (data: any) => {
        if (data) {
            const c = this.defaultEntity();
            Object.assign(c, data);
            return c;
        } else
            return this.defaultEntity();
    }
    static defaultEntity = () => {
        let newEntity = new Site() as any;
        this.newFields().forEach((def) => {
            newEntity[def.name] = def.defaultValue;
        });
        console.debug("Defaut entity", newEntity);
        return newEntity;
    }
    static newFields = () => {
        let configs = getConfigs();
        let locationTypes = configs.locationTypes ? configs.locationTypes : [{ name: "NA" }];
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.new("state"),
            FieldDef.select("country", 
                configs.countries.map((c: any) => { return { name: c.name, label: c.name, value: c.code } }))
                .useDefault("US")
                .useFormatter(getCountry),
            FieldDef.select("type", locationTypes.map((c: any) => { return { name: c.name, label: StringUtils.t(c.name), value: c.name } }))
        ]
    }
}
export class Vendor extends BaseEntity {
}
export class Inventory extends BaseEntity {
    standard: string = "";
    regulation: string = "";
    type: string = "";
    coverage: string = ""; //corporation, product, activity 
    description: string = "";
    year: string = "2022";
    items: Array<InventoryItem> = [];
    company: string = "";
    constructor(company: string) {
        super();
        this.company = company;
    }

    addItem = (item: InventoryItem) => {
        item.company = this.company;
        this.items.push(item);
    }

    static new = (data: any) => {
        let inv = new Inventory(data.company);
        Object.assign(inv, data);
        if (data.items) {
            inv.items = data.items.map((item: any) => {
                return InventoryItem.new(item);
            })
        }
        return inv;
    }
    static fieldDefs = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.select("type", ["carbon", "water", "waste"].map((s) => { return { name: s, label: s, value: s } })),
            FieldDef.select("coverage", ["corporation", "product", "activity"].map((s) => { return { name: s, label: s, value: s } })),
            FieldDef.select("year", ["2020", "2021", "2022", "2023"].map((s) => { return { name: s, label: s, value: s } }))
        ]
    }
}
export class InventoryCategory extends BaseEntity {
    scope = "1";
}
export class InventoryType extends BaseEntity {
    category = "1";
    txType = "0";
    vendor = ""
}
export enum Freq {
    Yearly,
    Monthly,
    Quarterly,
    Daily
}
export class InventoryItem extends BaseEntity {
    company = "";
    site = "";
    category = "";
    activity = "";
    uom = "";
    quantity: number = 0;
    frequency: Freq = Freq.Yearly;
    template: string = "";
    secondaryCategory: string = "";
    tertiaryCategory: string = "";
    createdAt: Date = new Date();
    validated: boolean = false;
    carbon: boolean = true;
    water: boolean = false;
    waste: boolean = false;

    static new = (data: any) => {
        const c = new InventoryItem();
        Object.assign(c, data);
        return c;
    }

    static fieldDefs = () => {
        let inventoryCategories = getConfigs()["inventoryCategories"];
        let c = getCompany();
        let sites = c?.sites.map((site: any) => {
            return {
                value: site.id,
                label: site.name
            } as SelectOption
        });
        let categories = inventoryCategories.map((cat: any) => {
            return { value: cat.name, label: StringUtils.t(cat.name) }
        });
        return [
            FieldDef.select("category", categories),
            FieldDef.select("site", sites!).useFormatter((siteId: string) => {
                let site = sites?.find((site: any) => site.value === siteId);
                return site ? StringUtils.t(site.label) : siteId;
            }),
            FieldDef.select("activity", (form: any) => {
                let cat = form["category"];
                let category = inventoryCategories.find((c: any) => c.name === cat);
                if (category !== undefined) {
                    return [{
                        value: "",
                        label: "Please select a category"
                    }, ...category.activities.map((a: any) => {
                        return {
                            value: a,
                            label: StringUtils.t(a)
                        }
                    })]
                } else {

                    return [{
                        value: "",
                        label: "please select a type first"
                    }]
                }
            }),
            FieldDef.select("frequency", StringUtils.enumOptions(Freq)).useDefault("Yearly"),
            FieldDef.select("uom", (form: any) => {
                let cat = form["category"];
                let category = inventoryCategories.find((c: any) => c.name === cat);
                if (category !== undefined) {
                    return [{
                        value: "",
                        label: "Please select a unit"
                    }, ...category.units.map((a: any) => {
                        return {
                            value: a,
                            label: StringUtils.t(a)
                        }
                    })]
                } else {
                    return [{
                        value: "",
                        label: "please select a type first"
                    }]
                }
            }),
            FieldDef.new("quantity", ValueType.NUMBER).options("required", true)
        ]
    }

    static defaultEntity = () => {
        let newEntity = { id: StringUtils.guid() } as any;
        this.fieldDefs().forEach((def) => {
            newEntity[def.name] = def.defaultValue;
        });
        console.debug("Defaut entity", newEntity);
        return newEntity;
    }
}
export type NameValuePair = {
    name: string,
    type: string,
    value?: string
}
export type ConnectorConfig = {
    driver: string;
    properties: Array<NameValuePair>
}
export class Connector extends BaseEntity {
    type: string = "";
    version: string = ""
    status?: string;
    config?: ConnectorConfig;
    direction: string = "Inbound"
    instances: Array<ConnectorInstance> = [];
    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.select("type",
                ["", "Database", "API", "Platform", "Files"].map((type: any) => { return { name: type, label: type.length === 0 ? "Select a type" : type, value: type } })),
            FieldDef.select("direction",
                ["Inbound", "Outbound", "Both"].map((type: any) => { return { name: type, label: type, value: type } })),
        ]
    }
    static new = (formData: any) => {
        let c = new Connector();
        Object.assign(c, formData);
        c.createdAt = new Date();
        c.createdBy = securityManager.getUserName();
        c.updatedAt = new Date();
        c.updatedBy = securityManager.getUserName();
        c.status = "active";
        return c;
    }
}
export class ConnectorInstance extends BaseEntity {
    connectorId: string = "";
    version: string = ""
    instanceConfig: Array<NameValuePair> = []
    status?: string;

    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.new("status"),
            FieldDef.new("connectorId"),
        ]
    }
}

export class emissionFactor extends BaseEntity {
    country: string = ""
    standard: string = "";
    category: string = "";
    year: string = "2022";
    factory: number = 0;
    type = "";
    uom?: string;
}

export class InventoryTypeFactorMapping extends BaseEntity {
    factorId = "";
    typeId = "";
}

export class EmissionType extends BaseEntity {
    ratioToCO2: number = 1;
}

