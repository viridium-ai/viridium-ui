import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { FieldDef, EntityDetails, EntityList } from "components/v-entity/entity-form";
import { StringUtils } from "components/v-utils/v-string-utils";
import { CommonEntity, DataDirection, DataProcessManager } from "./v-common";
import { NameValuePair } from "components/v-entity/entity-model";

import "./v-connector.css"

/**
 * A connector is the software that can connect to datasets between systems. It must be 
 * implemented as a Viridium Connector Plugin, and configured the same way. 
 * 
 * A connector defines how to connect, but does not connect to remote system. To connect two systems, 
 * an instance of a connector must be created and run as a job.
 * 
 * A job is the unit of work that connects to a remote system, and performs the work.
 * 
 * In order to for a connector to perform work, it must be configured with a mapper that defines how to
 * the inbound data maps to the outbound data.
 * 
 * A data source defines the inbound data, and a data target defines the outbound data. The mapper
 * is responsible for mapping the inbound data to the outbound data.
 * 
 */
export enum ConnectorType {
    Database = "Database",
    API = "API",
    Platform = "Platform",
    Files = "Files",
    Manual = "Manual"
}

const connectorManager = new DataProcessManager("Connector");

export class Connector extends CommonEntity {
    type: ConnectorType = ConnectorType.Database;
    pluginId: string = "";
    pluginName: string = "";
    pluginVersion: string = "";
    direction: DataDirection = DataDirection.Inbound
    properties?: Array<NameValuePair> = [];
    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.new("pluginName"),
            FieldDef.select("type", StringUtils.enumOptions(ConnectorType)),
            FieldDef.select("direction", StringUtils.enumOptions(DataDirection))
        ]
    }
    static new = (formData: any) => {
        return Object.assign(new Connector(), formData);
    }
}
export class ConnectorInstance {
    id: string = crypto.randomUUID().slice(0, 8);
    connectorId: string = "";
    version: string = ""
    name: string = "";
    description: string = "";
    instanceConfig: Array<NameValuePair> = []
    status?: string;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date
    static newFields = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("description"),
            FieldDef.new("status"),
            FieldDef.new("connectorId"),
        ]
    }
}
interface ConnectorViewState {
    connector: Connector
}
interface ConnectorViewProps {
    connector: Connector
}
/**
 * A connector view is a view of a connector. It shows the properties of the connector
 */
export class ConnectorView extends React.Component<ConnectorViewProps, ConnectorViewState> {
    constructor(props: ConnectorViewProps) {
        super(props);
        this.state = { connector: props.connector };
    }
    componentDidMount(): void {

    }
    componentDidUpdate = (prevRow: ConnectorViewProps) => {
        if (this.props.connector.id !== prevRow.connector.id) {
            this.setState({ connector: this.props.connector });
        }
    }

    hideFilter = (def: any) => {
        return ["id"].includes(def.name);
    }

    render() {
        let connector = this.state.connector!;
        return (
            <div className="v-connector-container">
                <div className="v-connector-details">
                    <EntityDetails hide={this.hideFilter} entity={connector} title={"Connector"} />
                </div>
                <div className="v-connector-properties">
                    <EntityList entities={connector.properties!} showTitle title={"Properties"} />
                </div>
            </div>
        );
    }
}
type ConnectorConfigProps = {
    direction: string,
    onProcessData?: Function
}
type ConnectorConfigState = {
    connector?: any
}
export class ConnectorConfig extends Component<ConnectorConfigProps, ConnectorConfigState> {
    guid: string = crypto.randomUUID();
    constructor(props: ConnectorConfigProps) {
        super(props);
        this.state = { connector: undefined }
    }
    onSelectConnector = (evt: any) => {
        let c = evt.target.value;
        this.setState({ connector: c });
    }
    render = () => {
        let connectors = connectorManager.get().filter((c: any) => c.direction === "Both" || c.direction === this.props.direction)
        let connector = connectors.find((c: any, idx: number) => c.id === this.state.connector) as Connector;
        return (
            <div className="v-connector-config">
                <Form.Select onChange={this.onSelectConnector} value={this.state.connector}>
                    <option key={'c-x'} value="">Please select a connector</option>
                    {connectors.map((c: any, idx: number) => {
                        return <option key={'c-' + idx} value={c.id}>{c.name}</option>
                    })}
                </Form.Select>

                <div className="v-connector-config-form">
                    {
                        connector ? <ConnectorView connector={connector} /> : <div />
                    }
                </div>
            </div>
        )
    };
}
