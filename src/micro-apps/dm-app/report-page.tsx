import { Component } from "react";
import { Row, Col, Toast, Tabs, Tab, Form, Button } from "react-bootstrap";
import { LayoutPage } from "../../components/v-layout"
import { DataTable, DimensionView } from "../../components/v-table";
import { getConfigs, getState, saveState } from "../../config/v-config";

import { dataSourceManager } from "./dm-app";
type ReportConfigState = {
    dataCoverageScope: string,
    environmentalCategory: string,
    valueChainMasterCategory: string,
    valueChainCategory: string,
    valueChainSubCategory: string,
    standard: string,
    regulation: string,
    connector: string
}

const defaultState = {
    dataCoverageScope: "1",
    environmentalCategory: "1",
    valueChainMasterCategory: "1",
    valueChainCategory: "1",
    valueChainSubCategory: "1",
    standard: "1",
    regulation: "1",
    connector: "1"
}

export class ReportConfigPage extends Component<any, ReportConfigState> {
    constructor(props: any) {
        super(props);
        this.state = getState("ReportConfigPage", defaultState);
    }
    updateState = (s: any) => {
        this.setState(s);
        saveState("ReportConfigPage", { ...this.state });
    }
    getData = () => {
        return getConfigs().reportMockData;
    }
    onSelectRow = (evt: any) => {
    }
    coverageOptions = () => {
        return {
            value: this.state.dataCoverageScope, label: "Scope of data coverage", placeHolder: "Select a coverage", onSelectValue: (v: any) => {
                this.updateState({ "dataCoverageScope": v.id });
            }
        }
    }
    envCatOptions = () => {
        return {
            value: this.state.environmentalCategory, label: "Environmental Category", placeHolder: "Select a category", onSelectValue: (v: any) => {
                this.updateState({ "environmentalCategory": v.id });
            }
        }
    }
    Category0Options = () => {
        return {
            value: this.state.valueChainMasterCategory, label: "Value Chain Master Category", placeHolder: "Select a master category", onSelectValue: (v: any) => {
                this.updateState({ "valueChainMasterCategory": v.id });
            }
        }
    }
    Category1Options = () => {
        return {
            value: this.state.valueChainCategory, label: "Value Chain Category", placeHolder: "Select a category", onSelectValue: (v: any) => {
                this.updateState({ "valueChainCategory": v.id });
            }
        }
    }
    Category2Options = () => {
        return {
            value: this.state.valueChainSubCategory, label: "Value Chain Sub Category", placeHolder: "Select a subcategory", onSelectValue: (v: any) => {
                this.updateState({ "valueChainSubCategory": v.id });
            }
        }
    }
    StandardOptions = () => {
        return {
            value: this.state.standard, label: "Standards", placeHolder: "Select a standard", onSelectValue: (v: any) => {
                this.updateState({ "standard": v.id });
            }
        }
    }
    RegulationOptions = () => {
        return {
            value: this.state.regulation, label: "Regulations", placeHolder: "Select a regulation", onSelectValue: (v: any) => {
                this.updateState({ "regulation": v.id });
            }
        }
    }
    ExportOptions = () => {
        return {
            value: this.state.connector, placeHolder: "Select a connector", onSelectValue: (v: any) => {
                this.setState({ "connector": v.id });
                saveState("ReportConfigPage", { ...this.state });
            }
        }
    }
    render = () => {
        const configs = getConfigs();
        return (
            <LayoutPage microApp={dataSourceManager}>
                    <div className="v-body-nav">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <h4>Data Filters</h4>
                            </Toast.Header>
                            <Toast.Body>
                                <DimensionView data={configs.dataCoverageScopes} options={this.coverageOptions()} />
                                <DimensionView data={configs.environmentalCategories} options={this.envCatOptions()} />
                                <DimensionView data={configs.valueChainMasterCategories} options={this.Category0Options()} />
                                <DimensionView data={configs.valueChainCategories} options={this.Category1Options()} />
                                <DimensionView data={configs.valueChainSubCategories} options={this.Category2Options()} />
                                <DimensionView data={configs.standards} options={this.StandardOptions()} />
                                <DimensionView data={configs.regulations} options={this.RegulationOptions()} />
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="v-body-main">
                        <div className="dashboard-panel">
                            <Tabs defaultActiveKey="customReports" id="uncontrolled-tab-example" className="mb-3" >
                                <Tab eventKey="prebuiltReports" title="Pre Built Reports">
                                    <div>
                                        fatback bresaola, culpa exercitation cupidatat.  Laboris ut filet mignon landjaeger.
                                        Sint shoulder eiusmod
                                    </div>
                                </Tab>
                                <Tab eventKey="customReports" title="Custom Reports">
                                    <Row className="filters">
                                        <Col className="data-cell-select data-cell-label">
                                            Select:
                                        </Col>
                                        <Col className="data-cell-select">
                                            <Form.Select aria-label="Default select example">
                                                <option>Scope</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="data-cell-select">
                                            <Form.Select aria-label="Default select example">
                                                <option>Source</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="data-cell-select">
                                            <Form.Select aria-label="Default select example">
                                                <option>Process</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="data-cell-select">
                                            <Form.Select aria-label="Default select">
                                                <option>Region</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="data-cell-select">
                                            <Form.Select aria-label="Default select">
                                                <option>Supplier</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="data-cell-select">
                                            <Form.Select aria-label="Default select">
                                                <option>Goal/Project</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="data-cell-select"><Button>Ok</Button></Col>
                                    </Row>
                                    <DataTable data={this.getData()} onSelectRow={this.onSelectRow} />
                                    <Row className="export-panel">
                                        <Col sm={1} className="data-cell-select data-cell-label">Export data to:
                                        </Col>
                                        <Col sm={3} className="data-cell-select">
                                            <DimensionView data={configs.managedConnectors.map((v: any) => { return { id: v.id, label: v.name } })} options={this.ExportOptions()} />
                                        </Col><Col sm={1} className="data-cell-select">
                                            <Button >Submit</Button>
                                        </Col>
                                        <Col sm={6}> </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="analyzingEmission" title="Analyzing Emissions">
                                    <div>
                                        fatback bresaola, culpa exercitation cupidatat.  Laboris ut filet mignon landjaeger.
                                        Sint shoulder eiusmod
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
            </LayoutPage >
        )
    }
}