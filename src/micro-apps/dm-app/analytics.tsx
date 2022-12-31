
import { Row, Col, Toast, ProgressBar, Table, Tabs, Tab, Form } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout'

import { dataSourceManager } from './dm-app';

export const Analytics = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} withAppHeader = {true} routeItem={{ name: '' }}>
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
                            <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Progress</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Row >
                                        <Col xs={2}>
                                            Acme Goal
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="success" now={40} />
                                        </Col>
                                        <Col xs={1}>

                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col xs={2}>
                                            Acme  Supply Chain Initiative
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="danger" now={80} />
                                        </Col>
                                        <Col xs={1}>

                                        </Col>
                                    </Row>
                                </Toast.Body>
                            </Toast>
                        </div>
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
                                        <Col>
                                            <Form.Select aria-label="Default select example">
                                                <option>Scope</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <Form.Select aria-label="Default select example">
                                                <option>Source</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <Form.Select aria-label="Default select example">
                                                <option>Process</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <Form.Select aria-label="Default select example">
                                                <option>Region</option>
                                                <option value="1">Transportation</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <div>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Progress</th>
                                                <th>tCO2e</th>
                                                <th>Scope</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                                <td >Larry the Bird</td>
                                                <td>Thornton</td>
                                                <td>@twitter</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    </div>
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