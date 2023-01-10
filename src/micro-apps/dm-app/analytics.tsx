
import { Row, Col, Toast, Tabs, Tab, Form, Button } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout'
import { DataTable, DimensionView } from '../../components/table';
import { getConfigs } from '../../config/viridium-config';

import { dataSourceManager } from './dm-app';

export const Analytics = (props: any) => {
    const configs = getConfigs();
    const getData = () => {
        return {
            id: "1",
            headers: [
                { type: "text", text: "Progress" },
                { type: "text", text: "tCO2e" },
                { type: "text", text: "Scope" }
            ],
            rows: [
                {
                    id: "1",
                    cols: [{ type: "text", text: "Shipping" },
                    { type: "text", text: "1000" },
                    { type: "text", text: "Scope 1" }
                    ]
                },
                {
                    id: "2", cols: [
                        { type: "text", text: "Business Travel" },
                        { type: "text", text: "1000" },
                        { type: "text", text: "Scope 1" }
                    ]
                }, {
                    id: "3", cols: [
                        { type: "text", text: "Employee Commute" },
                        { type: "text", text: "1000" },
                        { type: "text", text: "Scope 3" }
                    ]
                }, {
                    id: "4", cols: [
                        { type: "text", text: "Customer Commute" },
                        { type: "text", text: "1000" },
                        { type: "text", text: "Scope 3" }
                    ]
                }
            ]
        }
    }
    const onSelectRow = (evt: any) => {
    }
    const onSelectDim = (evt: any) => {
    }
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} withAppHeader={true} routeItem={{ name: '' }}>
                <div className="home-body">
                    <div className="home-body-nav">
                        <Toast >
                            <Toast.Body>
                                <DimensionView data={configs.dataCoverageScopes} value="test" label={'Scope of data coverage'} placeHolder={"Select a coverage"} onSelectValue={onSelectDim} />
                                <DimensionView data={configs.environmentalCategories} value="test" label={'Environmental Category'} placeHolder={"Select a category"} onSelectValue={onSelectDim} />
                                <DimensionView data={configs.valueChainMasterCategories} value="test" label={'Value Chain Master Category'} placeHolder={"Select a master category"} onSelectValue={onSelectDim} />
                                <DimensionView data={configs.valueChainCategories} value="test" label={'Value Chain Category'} placeHolder={"Select a category"} onSelectValue={onSelectDim} />
                                <DimensionView data={configs.valueChainSubCategories} value="test" label={'Value Chain Sub Category'} placeHolder={"Select a sub category"} onSelectValue={onSelectDim} />
                                <DimensionView data={configs.standards} value="test" label={'Standards'} placeHolder={"Select a standard"} onSelectValue={onSelectDim} />
                                <DimensionView data={configs.regulations} value="test" label={'Regulations'} placeHolder={"Select a regulation"} onSelectValue={onSelectDim} />
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="home-body-main">
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
                                        <Col className="data-cell-select">
                                            <Button>Ok</Button>
                                        </Col>
                                    </Row>
                                    <DataTable data={getData()} onSelectRow={onSelectRow} />
                                    <Row className="export-panel">
                                        <Col sm={1} className="data-cell-select data-cell-label">Export data to:
                                        </Col>
                                        <Col sm={3} className="data-cell-select">
                                            <Form.Select value={"Microsoft Power BI"} onChange={onSelectRow}>
                                                {
                                                    ["Microsoft Power BI", "SAP Sustainability Suite", "CSV Files"].map((v, idx) => {
                                                        return <option key={idx} value={v}>{v}</option>
                                                    })
                                                }
                                            </Form.Select>
                                        </Col><Col sm={1} className="data-cell-select">
                                            <Button >Submit</Button>
                                        </Col>
                                        <Col sm={6}>

                                        </Col>
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
                </div>
            </LayoutPage >
        )
    }
    return ui();
}