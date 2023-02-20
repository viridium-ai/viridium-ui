import { localCache } from "../../components/v-utils/v-cache-manager";
import { StringUtils } from "../../components/v-utils/v-string-utils";
import { getConfigs } from "../../config/v-config";
import { InventoryItem } from "../viridium-model";

export interface Question { id?: string, name: string, notes?: string };

export interface Row {
    name: string;
    cols: Array<string>
}

export interface Table {
    rows: Array<Row>,
    name: string
}

export class Questionnaire {
    //step 1
    companyId: string = "Test";
    companyName: string = "Test";

    category?: string = "";
    templateName: string = "";

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
    inventoryItems: Array<InventoryItem> = [];

    static getType(q: Questionnaire) {
        let c = getConfigs();
        return c.environmentalCategories.find((s: any) => s.id === q.type).label;
    }

    static getContext(q: Questionnaire) {
        let c = getConfigs();
        return c.dataCoverageScopes.find((s: any) => s.id === q.context).label;
    }
    static getStandard(q: Questionnaire) {
        let c = getConfigs();
        return c.standards.find((s: any) => s.id === q.standard).label;
    }
    static getRegulation(q: Questionnaire) {
        let c = getConfigs();
        return c.regulations.find((s: any) => s.id === q.regulation).label;
    }

    static export(q: Questionnaire) {

    }

    toMatrix = () => {
        let tables: Array<Table> = [];
        let summary: Table = {
            rows: [],
            name: "summary"
        }
        summary.rows.push({
            name: "1",
            cols: ["Company Name", this.companyName]
        });
        summary.rows.push({
            name: "2",
            cols: ["Template Name", StringUtils.t(this.templateName)!]
        });
        tables.push(summary);
        let inventory: Table = {
            rows: [],
            name: "Inventory"
        }
        inventory.rows.push({
            name: "0",
            cols: ["Category", "Sub Category", "Tertiary Category", "Accountable", "MoU", "Quantity", "Freq"]
        });
        this.inventoryItems.forEach((inv, idx) => {
            inventory.rows.push({
                name: "" + idx,
                cols: [
                    inv.category ? inv.category : "",
                    inv.secondaryCategory ? inv.secondaryCategory : "",
                    inv.tertiaryCategory ? inv.tertiaryCategory : "",
                    inv.activity, "", "", ""]
            });
        })
        tables.push(inventory);
        return tables;
    }

    toTsv = () => {
        let lines: Array<string> = [];
        lines.push(["","Company", "Site", "Template", "Category", "Sub Category", "Tertiary Category", "Accountable", "Unit", "Quantity", "Date From", "Date To"].join("\t"));
        this.inventoryItems.forEach((inv, idx) => {
            lines.push([
                ""+idx,
                this.companyName,
                inv.site,
                this.templateName,
                inv.category ? inv.category : "",
                inv.secondaryCategory ? inv.secondaryCategory : "",
                inv.tertiaryCategory ? inv.tertiaryCategory : "",
                inv.activity, "", "", "", ""].join("\t"));
        });
        lines.push("\tData Sources");
        this.dataSources.forEach(((ds0, idx) => {
            lines.push([
                ""+idx,
                this.companyName,
                ds0].join("\t"));
        }));

        lines.push("\tQuestions");
        this.questions.forEach(((ds0, idx) => {
            lines.push([
                ""+idx,
                this.companyName,
                ds0.name, ds0.notes].join("\t"));
        }));
        return lines;
    }
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
