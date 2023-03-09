
import { Row, Col, Toast, Form, Button } from 'react-bootstrap';
import { LayoutPage } from 'components/v-layout/v-layout'
import { dataSourceManager } from '../dm-app';
import { PureComponent } from 'react';
import TreeView from 'components/v-tree-view/v-tree-view';
import { getConfigs } from 'config/v-config';

export class MarketPlace extends PureComponent {
    getTaxonomy = () => {
        const taxonomy = getConfigs()["taxonomy"];
        console.log(taxonomy);
        return {
            id: "Taxonomy",
            text:"Taxonomy",
            children:taxonomy
        };
    }
    render = () => {
        return (
            <LayoutPage microApp={dataSourceManager} pageName="data-cloud">
                <div slot="side-nav">
                    <TreeView options={{ selectable: false, enableLinks: true, selectChildren: false }}  data={this.getTaxonomy()} />
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
}