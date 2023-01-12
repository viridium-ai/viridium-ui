import React from 'react';
import { useState } from 'react';
import { Row, Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout';
import TreeView from '../../components/tree-view';
import { getConfigs } from '../../config/viridium-config';
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
class ConnectorView extends React.Component<ConnectorViewProps, ConnectorViewState> {
    constructor(props: ConnectorViewProps) {
        super(props);
        this.state = { connector: props.connector };
    }
    onUpdateScope = (evt: any) => {

    }
    componentDidUpdate = (prevRow: ConnectorViewProps) => {
        if (this.props.connector.id !== prevRow.connector.id) {
            this.setState({ connector: this.props.connector });
        }
    }

    render() {
        let connector = this.state.connector;
        return (
            <div className="details-box">
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

export const ConnectManagerView = (props: any) => {
    const [connector, setConnector] = useState<Connector>();
    var configs = getConfigs();
    var managedConnectors: Array<Connector> = configs.managedConnectors;

    const selectConnector = (data: any, target: any) => {
        let id = target.id;
        let c = managedConnectors.find((c: any) => id === c.id);
        if (c) {
            setConnector(c);
        }
    }

    const getTreeData = () => {
        return {
            id: "viridium-connectors",
            text: "Viridium Connectors",
            as: "list",
            state: {
                selected: false,
                expanded: false
            },
            children: managedConnectors.map((connector) => {
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
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} withAppHeader={true} >
                <div className="home-body">
                    <div className="home-body-nav">
                        <Toast >
                            <Toast.Body>
                                <div className="header">
                                    Manage Connector
                                </div>
                                <div className="item">
                                    <TreeView onClick={selectConnector} data={getTreeData()} options={{ selectable: false, enableLinks: false }} />
                                </div >
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="home-body-main">
                        <Toast >
                            <Toast.Body>
                                <div className="header">
                                    Connector
                                </div>
                                <div className="item">
                                    {
                                        connector ? <ConnectorView connector={connector} /> : <div />
                                    }</div >
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage>
        )
    }
    return ui();
}
