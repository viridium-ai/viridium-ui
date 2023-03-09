import { PureComponent, } from "react";

import { Toast, Form, Row, Col } from "react-bootstrap";
import { Action } from "components/v-flow/wizard";
import { LayoutPage } from "components/v-layout/v-layout";
import { StringUtils } from "components/v-utils/v-string-utils";

import { getConfigs } from "config/v-config";
import { inventoryConfigApp } from "../inventory-app";
import { getQuestionnaire, updateQuestionnaire } from "../inventory-questionnaire";
import { QuestionnaireView } from "./value-chain-categories";

export class DataSources extends PureComponent<any, { report: any, dataSources: Array<any> }>{
    constructor(props: any) {
        super(props);
        const configs = getConfigs();
        const ds = configs.dataSources.map((value: string, idx: number) => {
            return { id: value, label: value }
        }).filter((value: any) => value !== null);

        this.state = {
            report: getQuestionnaire(), dataSources: ds
        }
    }

    onSelectItem = (evt: any) => {
        let clone = { ...this.state.report };
        if (evt.target.checked && !clone.dataSources.includes(evt.target.id)) {
            clone.dataSources.push(evt.target.id);
        } else if (!evt.target.checked) {
            clone.dataSources = clone.dataSources.filter((source: any) => source !== evt.target.id);
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

    selectAll = (evt: any) => {
        let clone = { ...this.state.report };
        let configs = getConfigs();
        clone.dataSources = configs.dataSources.map((value: any, idx: number) => {
            return value;
        });
        this.setState({ report: clone });
        updateQuestionnaire(clone);

    }
    clearAll = (evt: any) => {
        let clone = { ...this.state.report };
        clone.dataSources = [];
        this.setState({ report: clone });
        updateQuestionnaire(clone);
    }
    addNew = (evt: any) => {
        alert('to be implemented');
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
                        Template:   {StringUtils.t(this.state.report.templateName)}
                    </Toast.Header>
                    <Toast.Body>
                        <Row className="v-panel">
                            <QuestionnaireView />
                        </Row>
                        <Row className="v-panel">
                            <div className="v-title">
                                Possible data sources
                            </div>
                            <div>
                                Please select ones in the following enterprise information systems would
                                provide information for the report?
                            </div>
                        </Row>
                        <Row className="v-panel">
                            <Col sm={6} >
                                <Form.Group controlId="searchDataSource">
                                    <Form.Control className="v-search-box" type="text"
                                        onChange={this.onSearch} placeholder="Search" />
                                </Form.Group>
                            </Col>
                            <Col sm={6} >
                                <div className="v-right">
                                    <span className="v-icon-button" onClick={this.selectAll} >Select All </span>
                                    <span className="v-icon-button" onClick={this.clearAll} >Clear </span>
                                    <span className="v-icon-button" onClick={this.addNew} >Add </span>
                                </div>
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
                        <div className="v-footer v-flex">
                            <Action report={report}
                                next={{ label: "Next", path: this.props.next }}
                                prev={{ label: "Back", path: this.props.prev }} />
                        </div>

                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
}