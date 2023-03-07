import { Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { getConfigs } from "config/v-config";
import { ConnectorView } from "../../dm-app/pages/connector-manager";

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

    doUpload = () => {
        if (this.props.onProcessData) {
            this.props.onProcessData("Received data");
        }

    }

    onSelectConnector = (evt: any) => {
        let c = evt.target.value;
        this.setState({ connector: c });
    }
    render = () => {
        let configs = getConfigs();
        let connectors = configs.managedConnectors.filter((c: any) => c.direction === "Both" || c.direction === this.props.direction)

        let connector = connectors.find((c: any, idx: number) => c.id === this.state.connector);
        return (
            <div className="v-container">
                <Form.Select onChange={this.onSelectConnector} value={this.state.connector}>
                    {connectors.map((c: any, idx: number) => {
                        return <option key={'c-' + idx} value={c.id}>{c.name}</option>
                    })}
                </Form.Select>
                <Row>
                    <Col >
                        <div className="connector-config-form">
                            {
                                connector ? <ConnectorView connector={connector} /> : <div />
                            }
                        </div>
                    </Col>
                    <Col>
                        {
                            connector ? <div className="connector-config-form">
                                <Form.Group className="connector-config-form-field">
                                    <Form.Label>URL</Form.Label>
                                    <Form.Control id={this.guid + '-url'} type="text" />
                                </Form.Group>
                                <Form.Group className="connector-config-form-field">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control id={this.guid + '-username'} type="text" />
                                </Form.Group>
                                <Form.Group className="connector-config-form-field">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id={this.guid + '-password'} type="secret" />
                                </Form.Group>
                                <Form.Group className="connector-config-form-btns">
                                    <Button variant="light" onClick={this.doUpload} name="submit">{this.props.direction === "Inbound" ? "Import" : "Export"}</Button>
                                </Form.Group>
                            </div> : <div>Please select a connector for your data</div>
                        }
                    </Col>
                </Row>
            </div>
        )
    };
}