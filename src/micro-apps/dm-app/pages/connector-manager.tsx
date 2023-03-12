import React, { Component } from "react";
import {  Toast } from "react-bootstrap";
import { FieldDef, EntityDetails, EntityList, EntityForm, ValueType } from "components/v-entity/entity-form";

import { LayoutPage, ViridiumOffcanvas } from "components/v-layout/v-layout";
import TreeView from "components/v-tree-view/v-tree-view";
import { getConfigs, updateConfigs } from "config/v-config";
import { dataSourceManager } from "../dm-app";
import { Connector, ConnectorInstance, NameValuePair } from "micro-apps/viridium-model";


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
                <div slot="side-nav">
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
