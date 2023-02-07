import React, { Component } from "react";
import { Row, Toast } from "react-bootstrap";
import { securityManager } from "../../common/security/v-security-manager";
import { FieldDef, EntityDetails, EntityList, EntityForm, ValueType } from "../../components/v-entity/entity-form";
import { ValidationMessage } from "../../components/v-entity/entity-model";
import { LayoutPage, ViridiumOffcanvas } from "../../components/v-layout/v-layout";
import TreeView from "../../components/v-tree-view/v-tree-view";
import { getConfigs, updateConfigs } from "../../config/v-config";
import { dataSourceManager } from "./dm-app";

/**
 * A connector is the software that can connect to a dataset in a different system. It must be 
 * implemented as Viridium Connector Plugin, and configuration the same way. A connector
 * does not connect to remote system, instead, an instance of a connect will be able
 * connect to a remote dataset, and pull the data per a schedule and/or a job.
 * 
 * A connector defines how the instance of such a connect should be configured, and how the security
 * works. A connect normally is capable connect to multiple datasets in one location.
 * 
 * Each dataset must be created and mapped to that of Viridium datasets.
 * 
 */
export type NameValuePair = {
    name: string,
    type: string,
    value?: string
}
export type ConnectorConfig = {
    driver: string;
    properties: Array<NameValuePair>
}
export class Connector {
    id: string = crypto.randomUUID().slice(0, 8);
    type: string = "";
    version: string = ""
    name: string = "";
    description: string = "";
    status?: string;
    config?: ConnectorConfig;
    direction: string = "Inbound"
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date
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
        return ["id", "name"].includes(def.name);
    }

    render() {
        let connector = this.state.connector!;
        return (
            <div className="v-panel">
                <Row>
                    <EntityDetails hide={this.hideFilter} entity={connector} title={"Properties"} />
                </Row>
                <Row><EntityDetails entity={connector.config} title={"Implementation"} /></Row>
                <Row>
                    <EntityDetails entity={connector.config?.properties} title={"Implementation Properties"} />
                </Row>
            </div>
        );
    }
}

type ConnectManagerState = {
    connector?: Connector,
    showForm?: boolean,
    instanceForm?: boolean,
}

export class ConnectManagerView extends Component<any, ConnectManagerState> {
    managedConnectors: any;
    publicAPIs: any;
    constructor(props: any) {
        super(props);
        var configs = getConfigs();
        this.managedConnectors = configs.managedConnectors.filter((c: any) => c.type !== "API");
        this.publicAPIs = configs.managedConnectors.filter((c: any) => c.type === "API");
        this.state = {
            connector: this.managedConnectors[0],
            showForm: false,
            instanceForm: false
        }
    }

    selectConnector = (data: any, target: any) => {
        let id = target.id;
        let c = this.managedConnectors.find((c: any) => id === c.id);
        if (c) {
            this.setState({ connector: c });
        }
    }

    getTreeData = () => {
        return {
            id: "viridium-connectors",
            text: "Viridium Connectors",
            as: "list",
            state: {
                selected: false,
                expanded: false
            },
            children: this.managedConnectors.map((connector: any) => {
                return {
                    id: connector.id,
                    text: connector.name,
                    children: [],
                    state: {
                        selected: false,
                        expanded: false
                    }
                }
            })
        }
    }
    getPublicAPIs = () => {
        return {
            id: "viridium-connectors",
            text: "Viridium Connectors",
            as: "list",
            state: {
                selected: false,
                expanded: false
            },
            children: this.publicAPIs.map((api: any) => {
                return {
                    id: api.id,
                    text: api.name,
                    children: api.children ? api.children.map((path: any) => {
                        return {
                            id: path.id,
                            text: path.name,
                        }
                    }) : [],
                    state: {
                        selected: false,
                        expanded: false
                    }
                }
            })
        }
    }
    selectAPI = (data: any, target: any) => {
        let id = target.id;
        let c = this.publicAPIs.find((c: any) => id === c.id);
        if (c) {
            this.setState({ connector: c });
        }
    }
    addNew = () => {
        this.setState({ showForm: true });
    }
    config = () => {
        this.setState({ instanceForm: true });
    }
    hideForm = () => {
        this.setState({ showForm: false });
    }
    hideInstanceForm = () => {
        this.setState({ instanceForm: false });
    }
    onSubmit = (connector: any) => {
        let c = Connector.new(connector);
        let configs = getConfigs();
        configs.managedConnectors.push(c);
        updateConfigs(configs);
        this.hideForm();
    }
    getNewFields = () => {
        let fields = [
            FieldDef.new("name"),
            FieldDef.new("description"),
        ];
        if (this.state.connector?.config?.properties) {
            let properties = this.state.connector.config.properties;
            properties.filter((p) => p.type !== "array").forEach((p) => {
                fields.push(FieldDef.new(p.name, p.type as ValueType))
            });
        }
        console.log(fields);
        return fields;
    }
    onSelectInstance = (instance: any) => {
        console.log(instance);
    }
    onAddInstance = (instance: any) => {
        console.log(instance);
        let props = this.state.connector?.config?.properties;
        if (props) {
            let connectorInstance = new ConnectorInstance();
            Object.assign(connectorInstance, instance);
            connectorInstance.connectorId = this.state.connector!.id;
            connectorInstance.status = "active";
            connectorInstance.instanceConfig = props.map((p) => {
                return {
                    name: p.name,
                    value: instance[p.name],
                    type: p.type
                } as NameValuePair
            });
            let c = Connector.new(this.state.connector);
            c.instances!.push(connectorInstance);
            let configs = getConfigs();
            let connectors = configs.managedConnectors.filter((mc: any) => mc.id !== c.id);
            connectors.push(c);
            configs.managedConnectors = JSON.parse(JSON.stringify(connectors));
            (configs.managedConnectors as Array<Connector>).sort((a, b) => a.id.localeCompare(b.id));
            updateConfigs(configs);
            this.setState({ connector: c, instanceForm: false });
            this.managedConnectors = configs.managedConnectors;
        }
    }
    render = () => {
        let connector = this.state.connector;
        return (
            <LayoutPage microApp={dataSourceManager}  >
                <div className="v-body-nav">
                    <Toast >
                        <Toast.Body className="v-list">
                            <div className="v-list-header">
                                Technology Connectors
                            </div>
                            <div className="v-list-body">
                                <TreeView onClick={this.selectConnector} data={this.getTreeData()}
                                    options={{ selectable: false, enableLinks: false }} />
                            </div >
                        </Toast.Body>
                    </Toast>
                    <Toast >
                        <Toast.Body className="v-list">
                            <div className="v-list-header">
                                Public API
                            </div>
                            <div className="v-list-body">
                                <TreeView onClick={this.selectAPI} data={this.getPublicAPIs()}
                                    options={{ selectable: false, enableLinks: false }} />
                            </div >
                        </Toast.Body>
                    </Toast>
                </div>
                <div className="v-body-main">
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <div className="me-auto">{connector ? connector.name : "Connector"}
                            </div>
                            <div>
                                <span className="v-link" onClick={this.config}>Add Instance</span>
                            </div>
                        </Toast.Header>
                        <Toast.Body>
                            <div className="v-list">
                                {
                                    connector ? <EntityDetails fieldDefs={Connector.newFields} entity={this.state.connector} title={"Properties"} /> : <div />
                                }
                            </div >
                            <div className="v-list">
                                {
                                    connector && connector.instances && connector.instances.length > 0 ?
                                        <EntityList entities={connector.instances} title={'Instances'}
                                            fieldDefs={ConnectorInstance.newFields}
                                            onSelect={this.onSelectInstance}
                                            actions={
                                                [
                                                    {
                                                        label: "mapping",
                                                        onAction: (entity: any) => {
                                                            console.log(entity)
                                                        }
                                                    }
                                                ]
                                            } /> : <div className="v-message">No data sources for this connector are found</div>
                                }
                            </div >
                            <div className="v-entity">
                                {

                                }
                            </div >
                        </Toast.Body>
                    </Toast>
                </div>
                <ViridiumOffcanvas showTitle={false} onHide={this.hideForm}
                    showForm={this.state.showForm} title={"Add Connector"} >
                    <EntityForm inline={true} title="" fieldDefs={Connector.newFields}
                        onSubmit={this.onSubmit} mode={"create"} />
                </ViridiumOffcanvas>

                <ViridiumOffcanvas showTitle={false} onHide={this.hideInstanceForm}
                    showForm={this.state.instanceForm}
                    title={"Data source with " + this.state.connector?.name} >
                    <EntityForm inline={true} title="" fieldDefs={this.getNewFields}
                        onSubmit={this.onAddInstance} mode={"create"} />
                </ViridiumOffcanvas>
            </LayoutPage>

        )
    }
}
