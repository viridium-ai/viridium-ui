import { FieldDef } from "components/v-entity/entity-form";
import { NameValuePair} from "components/v-entity/entity-model";
import { CommonEntity, DataProcessManager} from "./v-common";


/**
 * A Job is a process that run in middleware containers. It is responsible
 * for executing a data process (ETL) at specific time or periodically.
 */

const jobManager = new DataProcessManager("Job");

export class Job extends CommonEntity {
    properties?: Array<NameValuePair> = [];
    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description")
        ]
    }

    static new = (formData: any) => {
   
            return Object.assign(new Job(), formData);
        
    }
}
