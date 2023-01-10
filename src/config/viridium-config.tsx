import { localCache } from "../utils/cache-manager";
import { Company, Inventory } from "../micro-apps/ghg-app/inventory-builder/model";

export const getConfigs = (): any => {
    let configs = localCache.get("Viridium.Config");
    if (configs === undefined) {
        configs = require("./configs.json");
        localCache.set("Inventory.Config", configs);
    }
    return configs;
}

export const updateConfigs = (config: any) => {
    localCache.set("Viridium.Config", config);
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
 