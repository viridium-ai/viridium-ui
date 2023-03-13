import { FieldDef } from "components/v-entity/entity-form";
import { securityManager } from "components/v-security/v-security-manager";
import { NameValuePair} from "components/v-entity/entity-model";
import { CommonEntity, DataDirection, DataProcessManager} from "./v-common";


/**
 * A Dataset represents a data that needs to be moved from source to designation.
 * 
 */

const datasetManager = new DataProcessManager("Dataset");

export class Dataset extends CommonEntity {
    direction : DataDirection = DataDirection.Inbound;
    fields?: Array<NameValuePair> = [];
    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.new("pluginName"),
        
        ]
    }

    static new = (formData: any) => {
        return Object.assign(new Dataset(), formData);
    }
}
