import React from 'react';
import { useState } from 'react';
import { Toast, Form, Col, Row, Button } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout';
import TreeView from '../../components/tree-view';
import { getConfigs } from '../../config/viridium-config';
import { dataSourceManager } from './dm-app';

type Connector = {
    id: string;
    name: string;
    description: string;
    status?: string;
    config: any;
    notes?: string;
    updatedBy: string;
    updatedAt?: Date,
    instances : Array<ConnectorInstance>;
}

type ConnectorInstance = {
    id: string;
    name: string;
    description: string;
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
    
    notesChanged = (evt: any) => {

    }
    onUpdateCategory = (evt: any) => {

    }
    render() {
        let connector = this.state.connector;
        return (
            <div className="details-box">
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Data Source Name
                    </Col>
                    <Col className="details-value" sm={9}>
                        {connector.name}
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Description
                    </Col>
                    <Col className="details-value" sm={9}>
                        {connector.description}
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Current Topics
                    </Col>
                    <Col className="details-value" style={{ fontWeight: 'bold' }} sm={4}>
                        Environmental Sustainability Category
                    </Col>
                    <Col className="details-value" style={{ fontWeight: 'bold' }} sm={5}>
                        Scope of Data Coverage
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>
                    </Col>
                    <Col className="details-control" sm={4}>
                        <Form.Check type="checkbox" id="carbon" onChange={this.onUpdateCategory} checked={true} label={"Carbon"} />
                    </Col>
                    <Col className="details-control" sm={5}>
                        <Form.Check type="checkbox" id="corporate" onChange={this.onUpdateScope} checked={true} label={'Corporate'} />
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>
                    </Col>
                    <Col className="details-control" sm={4}>
                        <Form.Check type="checkbox" onChange={this.onUpdateCategory} id="water" label={"Water"} />
                    </Col>
                    <Col className="details-control" sm={5}>
                        <Form.Check type="checkbox" onChange={this.onUpdateScope} id="product" label={'Product'} />
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>
                    </Col>
                    <Col className="details-control" sm={4}>
                        <Form.Check type="checkbox" onChange={this.onUpdateCategory} id="waster" label={"Waste"} />
                    </Col>
                    <Col className="details-control" sm={5}>
                        <Form.Check type="checkbox" onChange={this.onUpdateScope} id="process" label={'Process'} />
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>View Sample Data
                    </Col>
                    <Col className="details-value" sm={9}>
                        <a href="/">Click here to see sample data</a>
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Review and approve
                    </Col>
                    <Col className="details-value" sm={9}>
                        <a href="/">Classification and mapping by Viridium.AI</a>
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Notes
                    </Col>
                    <Col className="details-value" sm={9}>
                        <Form.Control as="textarea" onChange={this.notesChanged} value={connector.notes} rows={2} />
                    </Col>
                </Row>
                <Row className="details-action-row">
                    <Col className="details-label" sm={8}>
                    </Col>
                    <Col className="details-btn" sm={4}>
                        <Button >Submit Data Request</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export const ConnectManagerView = (props: any) => {
    const [connector, setConnector] = useState<Connector>();
    var configs = getConfigs();
    var managedConnectors : Array<Connector> = configs.managedConnectors;
    //const connectors: Array<Connector> = configs.connector;

    const onSelectConnector = (evt: any) => {
        let id = evt.target.value;
        let c = managedConnectors.find((c: any) => id === c.id);
        if (c) {
            setConnector(c);
        }
    }

    const selectConnector = (data:any, target:any) => {
        let id = target.id;
        let c = managedConnectors.find((c: any) => id === c.id);
        if (c) {
            setConnector(c);
        }
    }

    const getTreeData = () => {
        return {
            id:"viridium-connectors",
            text:"Viridium Connectors",
            as : "list",
            state: {
                selected: false,
                expanded: false
            },
            children: managedConnectors.map((connector)=> {
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
                        <div className="dashboard-panel">
                            {
                                connector ? <ConnectorView connector={connector} /> : <div />
                            }
                        </div>
                    </div>
                </div>
            </LayoutPage>
        )
    }
    return ui();
}
