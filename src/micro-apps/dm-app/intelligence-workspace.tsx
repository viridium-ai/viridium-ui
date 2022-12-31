import { Row, Col, Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout';
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
            <LayoutPage microApp={dataSourceManager} withAppHeader={true} >
                <div className="home-body">
                    <div className="home-body-nav">
                        <Toast >
                            <Toast.Body>
                                <div className="item">
                                    Current Status
                                </div>
                                <div className="item">
                                    Status YoY
                                </div >
                                <div className="item">
                                    Activities
                                </div>
                                <div className="item">
                                    Sources
                                </div>
                                <div className="item">
                                    Scope
                                </div>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="home-body-main">
                        <div className="dashboard-panel">
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
                        <div className="dashboard-panel">
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
                </div>
            </LayoutPage >
        )
    }
    return ui();
}
