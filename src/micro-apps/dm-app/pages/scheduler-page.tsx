import { Row, Col, Toast, Stack, Form } from 'react-bootstrap';
import { LayoutPage } from 'components/v-layout/v-layout';
import { dataSourceManager } from '../dm-app';

export const SchedulerPage = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} >
                <div className="v-body-nav">
                    <Toast >
                        <Toast.Body className="v-list">
                            <div className="v-list-body">
                                <div className="v-list-item">
                                    Planning Workspace
                                </div>
                                <div className="v-list-item">
                                    Net Zero Planning
                                </div >
                                <div className="v-list-item">
                                    Population Planning
                                </div>
                                <div className="v-list-item">
                                    Policy Planning
                                </div>
                                <div className="v-list-item">
                                    Supplier Planning
                                </div>
                                <div className="v-list-item">
                                    Source Planning
                                </div>
                            </div>
                        </Toast.Body>
                    </Toast>
                </div>
                <div className="v-body-main">
                    <div className="v-dashboard-panel">
                        <Toast >
                            <Toast.Header closeButton={false}>
                              Credit Goals/Targets
                            </Toast.Header>
                            <Toast.Body>
                                <Row className="test-ok">
                                    <Col   >
                                        Enterprise Wide
                                    </Col>
                                    <Col  >
                                        Progress/Activity Goal
                                    </Col>
                                    <Col  >
                                        Regulation Goal
                                    </Col>
                                    <Col  >
                                        Policy Goal
                                    </Col>
                                    <Col  >
                                        Product Pool
                                    </Col>
                                </Row>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="v-dashboard-panel">
                        <Stack direction="horizontal" gap={3}>
                            <div >Select a Template (optional)</div>
                            <div className="ms-auto"></div>
                            <div className="ms-end">
                                <Form.Select aria-label="Default select example">
                                    <option>Select a type</option>
                                    <option value="1">Transportation</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>
                            <div className="vr" />
                            <div className="ms-end">
                                <Form.Select aria-label="Default select example">
                                    <option>Select a source</option>
                                    <option value="1">Air flight</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select></div>
                            <div className="vr" />
                            <div >Preview template</div>
                        </Stack>
                    </div>
                    <div className="v-dashboard-panel">
                        <Row>
                            <Col className="v-field-label" sm={3}>Goal</Col>
                            <Col className="v-field-value" sm={9}>Net zero by 2030</Col>
                        </Row>
                        <Row>
                            <Col className="v-field-label" sm={3}>Target type and details</Col>
                            <Col className="v-text-body" sm={9}>
                                ongue commodo kevin burgdoggen nisi eiusmod. Rump pork belly veniam picanha nisi mollit, shank
                                laboris. Bresaola pancetta ut sirloin, nulla strip steak esse bacon consequat officia spare ribs.
                                Boudin ad pork belly voluptate, jerky ullamco officia.",
                            </Col>
                        </Row>
                        <Row>
                            <Col className="v-field-label" sm={3}>Map Stake Holders vs Goals</Col>
                            <Col className="v-field-value" sm={9}>
                                <Row>
                                    <Col>

                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="v-field-label" sm={3}>View and edit plan</Col>
                            <Col className="v-field-value" sm={9}>Prgoress Bar</Col>
                        </Row>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}