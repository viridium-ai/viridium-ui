import { Row, Col, Toast, ProgressBar, Table } from 'react-bootstrap';
import { LayoutPage} from '../../common/layout';
import { dataSourceManager } from './dm-app';

export const SourceManager = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} withAppHeader = {true} >
                <div className="home-body">
                    <div className="home-body-nav">
                        <Toast >
                            <Toast.Body>
                                <div className="item">
                                    Data In
                                    <div className="sub-item">
                                        Sources
                                    </div>
                                    <div className="sub-item">
                                        Integration
                                    </div>
                                    <div className="sub-item">
                                        Mapping
                                    </div>
                                </div>
                                <div className="item">
                                    Data Progress
                                    <div className="sub-item">
                                        Jobs
                                    </div>
                                    <div className="sub-item">
                                        Enrichment
                                    </div>
                                    <div className="sub-item">
                                        Aggregation
                                    </div>
                                </div >
                                <div className="item">
                                    Data Out
                                    <div className="sub-item">
                                        Data lakes
                                    </div>
                                    <div className="sub-item">
                                        Reporting
                                    </div>
                                </div>
                                <div className="item">
                                    Data Quality
                                    <div className="sub-item">
                                        Dashboard
                                    </div>
                                </div>
                                <div className="item">
                                    Setup
                                    <div className="sub-item">
                                        Net-Zero Glossary
                                    </div>
                                    <div className="sub-item">
                                        Unit Conversions
                                    </div>
                                    <div className="sub-item">
                                        Rules
                                    </div>
                                    <div className="sub-item">
                                        Alerts
                                    </div>
                                    <div className="sub-item">
                                        Retention
                                    </div>
                                </div>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="home-body-main">
                        <div className="dashboard-panel">
                            <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Data Quality - Completeness</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Row >
                                        <Col xs={3}>
                                            Purchase goods and services
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="warning" now={40} />
                                        </Col>

                                    </Row>
                                    <Row >
                                        <Col xs={3}>
                                            Capital goods
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="warning" now={60} />
                                        </Col>

                                    </Row>
                                    <Row >
                                        <Col xs={3}>
                                            Gas and Energy Related activities
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="danger" now={40} />
                                        </Col>

                                    </Row>
                                    <Row >
                                        <Col xs={3}>
                                            Upstream Transportation
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="danger" now={20} />
                                        </Col>

                                    </Row>
                                    <Row >
                                        <Col xs={3}>
                                            Business Travel
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="success" now={80} />
                                        </Col>

                                    </Row>
                                    <Row >
                                        <Col xs={3}>
                                            Employee consumption
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="success" now={80} />
                                        </Col>

                                    </Row>

                                </Toast.Body>
                            </Toast>
                        </div>
                        <div className="dashboard-panel">

                        </div>
                        <div className="dashboard-panel">
                            <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Data In Progress Out</strong>
                                </Toast.Header>
                                <Toast.Body>
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
                                </Toast.Body>
                            </Toast>
                        </div>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}