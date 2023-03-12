import { FieldDef } from "components/v-entity/entity-form";
import { NameValuePair } from "components/v-entity/entity-model";
import { Dataset } from "./v-dataset";
import { CommonEntity, DataProcessManager } from "./v-common";

/**
 * A Mapper maps source dataset to destination dataset via their field definitions. The map information
 * stored with a mapper will be used by a connect instance to convert a row from source dataset to 
 * destination row before it is inserted into the destination table.
 */

const mapperManager = new DataProcessManager("Mapper");

export class Mapper extends CommonEntity {
    from?: Dataset;
    to?: Dataset;
    mappings?: Array<{ from: NameValuePair, to: NameValuePair }> = [];
    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description")
        ]
    }
    static new = (formData: any) => {
        return Object.assign(new Mapper(), formData);
    }
}
