import { localCache } from "../../utils/v-cache-manager";

export interface Question { id?: string, name: string, notes?: string };

export class Questionnaire {
    //step 1
    companyId: string = "Test";
    companyName: string = "Test";
    category?: string = "";
    categoryId: string = "";
    context: string = "Carbon";
    type: string = "Company";
    standard: string = "4";
    regulation: string = "1";
    description: string = "";
    items: Array<string> = [];
    scope1Needs: Array<string> = [];
    scope3Needs: Array<string> = [];
    dataSources: Array<string> = [];
    functionCategories: Array<string> = [];
    questions: Array<Question> = [];
}

export const updateQuestionnaire = (report: Questionnaire) => {
    localCache.set("Questionnaire", report);
}

export const getQuestionnaire = (): Questionnaire => {
    return localCache.get("Questionnaire", new Questionnaire())
}

export interface NamedObject {
    id: string,
    name: string
}
