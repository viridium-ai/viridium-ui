
import { Row, Col, Toast, Form, Button } from 'react-bootstrap';
import { LayoutPage} from '../../common/layout'
import { dataSourceManager } from './dm-app';

export const MarketPlace = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} withAppHeader = {true} >
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
                                                <strong className="me-auto">Become a Data Provider</strong>
                                            </Toast.Header>
                                            <Toast.Body>
                                                <Row >
                                                    <Col>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="formDataDesc">
                                                                <Form.Label>Data Description</Form.Label>
                                                                <Form.Control type="text" placeholder="Data Description" />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBizModel">
                                                                <Form.Label>Expected Business Model</Form.Label>
                                                                <Form.Control type="text" placeholder="Business Model" />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formButtons">
                                                                <Button >
                                                                    Cancel
                                                                </Button>
                                                                &nbsp;
                                                                <Button variant="primary" type="submit">
                                                                    Submit
                                                                </Button>
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                </Row>
                                            </Toast.Body>
                                        </Toast>
                                    </Col>
                                    <Col>
                                        <Toast >
                                            <Toast.Header closeButton={false}>
                                                <strong className="me-auto">Request a New Dataset</strong>
                                            </Toast.Header>
                                            <Toast.Body>
                                                <Row>
                                                    <Col>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="formDataDesc">
                                                                <Form.Label>Data Description</Form.Label>
                                                                <Form.Control type="text" placeholder="Data Description" />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBizModel">
                                                                <Form.Label>When do you need the data</Form.Label>
                                                                <Form.Control type="text" placeholder="date" />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formButtons">
                                                                <Button >
                                                                    Cancel
                                                                </Button>
                                                                &nbsp;
                                                                <Button variant="primary" type="submit">
                                                                    Submit
                                                                </Button>
                                                            </Form.Group>
                                                        </Form>
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
                                    <strong className="me-auto">Product Spotlight and Recent Addition</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Row>
                                        <Col >
                                            <div>
                                                New Providers
                                            </div>
                                            <div className="panel-pie-item">

                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <div>
                                                New Data Sets
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