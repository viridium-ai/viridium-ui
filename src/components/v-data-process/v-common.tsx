import { DataService } from "components/v-data/data-service";
import { FieldDef } from "components/v-entity/entity-form";
import { Entity, EntityManager } from "components/v-entity/entity-model";
import { securityManager } from "components/v-security/v-security-manager";

/**
 * Data process is also known as ETL (Extract, Transform, Load). It is a process of moving data from one
 * source to another. The data process is composed of three components: Dataset, Mapper, and Connection.
 * 
 * Dataset is a data source or destination. It can be a database table, a file, or a web service.
 * Mapper is a mapping between two datasets. It defines how to map the fields from source dataset to
 * Connect is a process that moves data from source to destination. 
 * 
 * To create a data process, you identify a data source from which data will be moved to a destination. Both
 * source and destination have a pre-defined schema which will be used to create a mapper class to map the fields 
 * from source to destination. 
 * 
 * Finally, you need to create a connect to move data from source to destination. A connection uses a connector
 * to extract data, and one or many connectors save the data to destinations.
 * 
 * A data process can be run as a job. A job is a unit of work that moves data from source to destination. It
 * can be scheduled to run at a specific time or periodically. It should provide a way to monitor the
 * progress of the job, and to stop the job if needed.
 * 
 */

export enum DataDirection {
    Inbound = "Inbound",
    Outbound = "Outbound",
    Both = "Both"
}
export enum Status {
    Active = "Active",
    Deleted = "Deleted",
    Deprecated = "Deprecated"
}


export class DataProcessManager extends EntityManager<CommonEntity> {
    constructor(name: string) {
        super(name);
        this.service = new DataService("Viridium", require("./db.json"));
    }
}

export class CommonEntity implements Entity {
    id: string = crypto.randomUUID().slice(0, 8);
    version: string = ""
    name: string = "";
    description: string = "";
    status: Status = Status.Active;
    createdBy?: string;
    updatedBy?: string;
    updatedAt?: Date;
    createdAt: Date = new Date();
    validated: boolean = false;
    constructor() {
        this.createdAt = new Date();
        this.createdBy = securityManager.getUserName();
        this.updatedAt = new Date();
        this.updatedBy = securityManager.getUserName();
    }
    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description")
        ]
    }
}
