
import { Row, Col, Toast, Tabs, Tab, Form, Button } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout'

import { dataSourceManager } from './dm-app';
import { DataTable } from './source-manager';

export const Analytics = (props: any) => {
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
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} withAppHeader={true} routeItem={{ name: '' }}>
                <div className="home-body">
                    <div className="home-body-nav">
                        <Toast >
                            <Toast.Body>
                                <div className="item">
                                    Internal Reports
                                </div>
                                <div className="item">
                                    External Reports
                                </div >
                                <div className="item">
                                    Compliance Reports
                                </div>
                                <div className="item">
                                    Data Quality Reports
                                </div>
                                <div className="item">
                                    Annual Reports
                                </div>
                            </Toast.Body>
                        </Toast>
                        <Toast >
                            <Toast.Header closeButton={false}>
                                Dimensions
                            </Toast.Header>
                            <Toast.Body>
                                <div className="item">
                                    By Source
                                </div>
                                <div className="item">
                                    By Scope
                                </div >
                                <div className="item">
                                    By Process
                                </div>
                                <div className="item">
                                    By Suppliers
                                </div>
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
                                        <Col sm={1} className="data-cell-text ">
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
                                        <Col sm={1} className="data-cell-button">
                                            <Button>Ok</Button>
                                        </Col>
                                    </Row>
                                    <DataTable data={getData()} onSelectRow={onSelectRow} />
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