
import { Row, Col, Toast, Form, Button } from 'react-bootstrap';
import { LayoutPage } from 'components/v-layout/v-layout'
import { dataSourceManager } from '../dm-app';
import { PureComponent } from 'react';
import TreeView from 'components/v-tree-view/v-tree-view';
import { getConfigs } from 'config/v-config';
import "./market-place.css"

interface MarketPlaceProps {

}
interface MarketPlaceState {
    selected: any[]
}
export class MarketPlace extends PureComponent<MarketPlaceProps, MarketPlaceState> {

    constructor(props: MarketPlaceProps) {
        super(props);
        this.state = { selected: [] };
    }

    getTaxonomy = () => {
        const taxonomy = getConfigs()["taxonomy"];
        console.log(taxonomy);
        return {
            id: "Taxonomy",
            text: "Taxonomy",
            children: taxonomy
        };
    }
    onSelect = (event: any, node: any) => {
        console.log(node);
        let selected = [...this.state.selected];
        if (selected.includes(node)) {
            selected = selected.filter((n) => n !== node);
        } else {
            selected.push(node);
        }
        this.setState({ selected: selected });
    }
    render = () => {
        return (
            <LayoutPage microApp={dataSourceManager} pageName="data-cloud">
                <div slot="side-nav">
                    <TreeView onClick={this.onSelect} options={{ selectable: false, enableLinks: false, selectChildren: true }} data={this.getTaxonomy()} />
                </div>
                <div className="v-dashboard-panel">
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
                <div className="v-dashboard-panel">
                    <Toast >
                        <Toast.Header closeButton={false}>
                            Datasets Selected
                        </Toast.Header>
                        <Toast.Body className="shopping-card">
                            {this.state.selected.map((node) => {
                                return (
                                    <div className="shopping-card-item">
                                        {node.text}
                                    </div>
                                )
                            })
                            }
                        </Toast.Body>
                    </Toast>
                </div>
            </LayoutPage >
        )
    }
}