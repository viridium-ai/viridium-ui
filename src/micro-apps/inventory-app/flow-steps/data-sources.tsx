import { PureComponent, } from "react";

import { Toast, Form, Row, Col } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";

import { getConfigs } from "../../../config/v-config";
import { inventoryConfigApp } from "../inventory-app";
import { getQuestionnaire, updateQuestionnaire } from "../inventory-questionaire";
import { QuestionniarView } from "./value-chain-categories";

export class DataSources extends PureComponent<any, { report: any, toggleAll: boolean, dataSources: Array<any> }>{
    constructor(props: any) {
        super(props);
        const configs = getConfigs();
        const ds = configs.dataSources.map((value: string, idx: number) => {
            return { id: value, label: value }
        }).filter((value: any) => value !== null);

        this.state = {
            report: getQuestionnaire(), toggleAll: false, dataSources: ds
        }
    }

    onSelectItem = (evt: any) => {
        let clone = { ...this.state.report };
        if (evt.target.checked && !clone.dataSources.includes(evt.target.id)) {
            clone.dataSources.push(evt.target.id);
        } else if (!evt.target.checked)
        {
            clone.dataSources = clone.dataSources.filter((source : any)=> source !== evt.target.id);
        }
        this.setState({ report: clone });
        updateQuestionnaire(clone);
    }

    onSearch = (evt: any) => {
        let key = evt.target.value;
        const configs = getConfigs();
        const ds = configs.dataSources.map((value: string, idx: number) => {
            return { id: value, label: value }
        }).filter((value: any) => value !== null);
        if (key.trim() === "") {
            this.setState({ dataSources: [...ds] });
        } else {
            let filteredDSs = ds.filter((ds: any) => {
                return ds.label.toLocaleLowerCase().includes(key.toLocaleLowerCase());
            }
            );
            this.setState({ dataSources: [...filteredDSs] });
        }
    }

    ds1 = (): Array<{ id: string, label: string }> => {
        let configs = getConfigs();
        return this.state.dataSources.filter((value: any, idx: number) => {
            return idx < configs.dataSources.length / 2
        });
    };

    ds2 = (): Array<{ id: string, label: string }> => {
        let configs = getConfigs();
        return this.state.dataSources.filter((value: any, idx: number) => {
            return idx >= configs.dataSources.length / 2
        });
    };
    toggleAll = (evt: any) => {
        let clone = { ...this.state.report };
        if (!evt.target.checked) {
            clone.dataSources = [];
        } else {
            let configs = getConfigs();
            clone.dataSources = configs.dataSources.map((value: any, idx: number) => {
                return value;
            })
        }
        this.setState({ report: clone, toggleAll: evt.target.checked });
        updateQuestionnaire(clone);

    }
    render = () => {
        let report = this.state.report;
        return (
            <LayoutPage microApp={inventoryConfigApp}  >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {report.companyName}
                        </span>
                        Viridium Industry:   {report.category}
                    </Toast.Header>
                    <Toast.Body>
                        <QuestionniarView />
                        <Row className="v-title">
                            <Col sm={6} >
                                <Form.Group controlId="searchDataSource">
                                    <Form.Control className="v-search-box" type="text"
                                        onChange={this.onSearch} placeholder="Search" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <span style={{ float: "right"}}>
                                    <Form.Check onChange={this.toggleAll}
                                        type="checkbox"
                                        id="check-all-boxes"
                                        label={"Toggle All"}
                                        checked={this.state.toggleAll}
                                    />
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="v-panel">
                                <div className="v-panel-content">
                                    {this.ds1().map((item, idx) => (
                                        <div key={`default-${idx}`} className="mb-2">
                                            <Form.Check
                                                onChange={this.onSelectItem}
                                                type="checkbox"
                                                id={item.id}
                                                label={item.label}
                                                checked={report.dataSources.includes(item.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col className="v-panel">
                                <div className="v-panel-content">{this.ds2().map((item, idx) => (
                                    <div key={`default-${idx}`} className="mb-2">
                                        <Form.Check
                                            onChange={this.onSelectItem}
                                            type="checkbox"
                                            id={item.id}
                                            label={item.label}
                                            checked={report.dataSources.includes(item.id)}
                                        />
                                    </div>
                                ))}</div>

                            </Col>
                        </Row>
                        <Action report={report}
                            next={{ label: "Next", path: this.props.next }}
                            prev={{ label: "Back", path: this.props.prev }} />
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
}