import { localCache } from "../../utils/cache-manager";

export interface Question { id?: string, name: string, notes?: string };
export class InventoryItem {
    //step 1
    companyId: string = "Test";
    companyName: string = "Test";
    category? : string = "";
    categoryId : string = "";
    context: string = "Carbon";
    type: string = "Company";
    standard: string = "4";
    regulation: string = "1";
    description: string ="";
    items : Array<string> = [];
    scope1Needs : Array<string> = [];
    scope3Needs : Array<string> = [];
    dataSources : Array<string> = [];
    functionCategories : Array<string> = [];
    questions : Array<Question> = [];
}

export const updateInventoryItem = (report : InventoryItem) => {
    localCache.set("InventoryItem", report);
}

export const getInventoryItem = ()  : InventoryItem => {
    return localCache.get("InventoryItem", new InventoryItem())
}