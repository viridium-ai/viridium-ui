import React, { Component } from 'react';
import { Row, Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout/v-layout';
import TreeView from '../../components/v-tree-view/v-tree-view';
import { getConfigs } from '../../config/v-config';
import { EntityDetails } from '../service-browser/service-component';
import { dataSourceManager } from './dm-app';
type NameValuePair = {
    name: string,
    value: any
}
type ConnectorConfig = {
    driver: string;
    properties: Array<NameValuePair>
}
type Connector = {
    id: string;
    name: string;
    description: string;
    status?: string;
    config: ConnectorConfig;
    notes?: string;
    updatedBy: string;
    updatedAt?: Date,
    instances: Array<ConnectorInstance>;
}

type ConnectorInstanceConfig = {

}

type ConnectorInstance = {
    id: string;
    name: string;
    description: string;
    connector: Connector;
    instanceConfig: ConnectorInstanceConfig,
    status?: string;
    config: any;
    updatedBy: string;
    updatedAt?: Date
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

    render() {
        let connector = this.state.connector;
        return (
            <div className="v-panel">
                <Row>
                    <EntityDetails entity={connector} title={"Properties"} />
                </Row>
                <Row><EntityDetails entity={connector.config} title={"Implementation"} /></Row>
                <Row>
                    <EntityDetails entity={connector.config.properties} title={"Implementation Properties"} />
                </Row>
            </div>
        );
    }
}

type ConnectManagerState = {
    connector? : Connector
}

export class ConnectManagerView extends Component<any, ConnectManagerState> {
    managedConnectors : any;
    constructor(props :any) {
        super(props);
        var configs = getConfigs();
        this.managedConnectors = configs.managedConnectors;
        this.state = {connector : this.managedConnectors[0]}
    }
  
    selectConnector = (data: any, target: any) => {
        let id = target.id;
        let c = this.managedConnectors.find((c: any) => id === c.id);
        if (c) {
            this.setState({connector : c});
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
            children: this.managedConnectors.map((connector : any) => {
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
    render = () => {
        return (
            <LayoutPage microApp={dataSourceManager}  >
                <div className="v-body-nav">
                    <Toast >
                        <Toast.Body>
                            <div className="v-panel-header">
                                Manage Connector
                            </div>
                            <div className="v-list-item">
                                <TreeView onClick={this.selectConnector} data={this.getTreeData()}
                                     options={{ selectable: false, enableLinks: false }} />
                            </div >
                        </Toast.Body>
                    </Toast>
                </div>
                <div className="v-body-main">
                    <Toast >
                        <Toast.Body>
                            <div className="v-panel-header">
                                Connector
                            </div>
                            <div className="v-list">
                                {
                                    this.state.connector ? <ConnectorView connector={this.state.connector} /> : <div />
                                }
                            </div >
                        </Toast.Body>
                    </Toast>
                </div>
            </LayoutPage>
        )
    }
}
