
import { Row, Col, Toast, Form, Button } from 'react-bootstrap';
import { LayoutPage } from 'components/v-layout/v-layout'
import { dataSourceManager } from '../dm-app';

export const MarketPlace = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} >
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
                                         Become a Data Provider
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
                                           Request a New Dataset
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
                    <div className="v-dashboard-panel">
                        <Toast >
                            <Toast.Header closeButton={false}>
                              Product Spotlight and Recent Addition
                            </Toast.Header>
                            <Toast.Body>
                                <Row>
                                    <Col >
                                        <div>
                                            New Providers
                                        </div>
                                        <div className="v-pie-item">

                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <div>
                                            New Data Sets
                                        </div>
                                        <div className="v-pie-item">

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