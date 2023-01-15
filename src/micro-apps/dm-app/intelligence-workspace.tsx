import { Row, Col, Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout/v-layout';
import { dataSourceManager } from './dm-app';

/**
 * Main page for a user profile.
 * 
 * @param props 
 * @returns 
 */
export const IntelligenceWorkspace = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager}  >
                    <div className="v-body-nav">
                        <Toast >
                            <Toast.Body className="v-list">
                                <div className="v-list-item">
                                    Current Status
                                </div>
                                <div className="v-list-item">
                                    Status YoY
                                </div >
                                <div className="v-list-item">
                                    Activities
                                </div>
                                <div className="v-list-item">
                                    Sources
                                </div>
                                <div className="v-list-item">
                                    Scope
                                </div>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="v-body-main">
                        <div className="v-dashboard-panel">
                            <div>
                                <Row >
                                    <Col>
                                        <Toast >
                                            <Toast.Header closeButton={false}>
                                                <strong className="me-auto">Become a Model Provider</strong>
                                            </Toast.Header>
                                            <Toast.Body>
                                                <Row >
                                                    <Col>
                                                        <div className="panel-chart-item">

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Toast.Body>
                                        </Toast>
                                    </Col>
                                    <Col>
                                        <Toast >
                                            <Toast.Header closeButton={false}>
                                                <strong className="me-auto">Request a New Model</strong>
                                            </Toast.Header>
                                            <Toast.Body>
                                                <Row>
                                                    <Col className="sub-panel">
                                                        <div className="panel-pie-item">

                                                        </div>
                                                        <div>
                                                            Scope Distribution
                                                        </div>
                                                    </Col>
                                                    <Col className="sub-panel">
                                                        <div className="panel-pie-item">

                                                        </div>
                                                        <div>
                                                            Process Distribution
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Toast.Body>
                                        </Toast>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="v-dashboard-panel">
                            <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Model Output</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Row>
                                        <Col className="sub-panel">
                                            <div>

                                            </div>
                                            <div className="panel-pie-item">

                                            </div>

                                        </Col>
                                        <Col className="sub-panel">
                                            <div>

                                            </div>
                                            <div className="panel-pie-item">

                                            </div>

                                        </Col>
                                    </Row>
                                </Toast.Body>
                            </Toast>
                        </div>
                    </div>
            </LayoutPage >
        )
    }
    return ui();
}
