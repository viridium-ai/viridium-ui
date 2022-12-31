import { useState } from 'react';
import { Toast, Table, Form, Col, Row, Button } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout';
import TreeView from '../../components/tree-view';
import { NamedObject } from '../inventory-app/inventory-common';
import { dataSourceManager } from './dm-app';

interface Inventory {
    id: string,
    name: string,
    items: Array<InventoryItem>
}
interface InventoryItem {
    id: string,
    dataSourceName: string,
    description: string,
    notes: string
}

export const SourceManager = (props: any) => {
    const [selectedInventory, setInventory] = useState<Inventory>();

    var configs = require('./configs.json');

    var manageDataSource = configs.manageDataSource;
    var manageData = configs.manageData;

    const inventories: Array<Inventory> = configs.inventory;

    const onSelectInventory = (evt: any) => {
        let invenotryId = evt.target.value;
        let inventory = inventories.find((inv: any) => invenotryId === inv.id);
        if (inventory) {
            console.log(inventory);
            setInventory(inventory);
        }
    }

    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} withAppHeader={true} >
                <div className="home-body">
                    <div className="home-body-nav">
                        <Toast >
                            <Toast.Body>
                                <div className="header">
                                    Manage Data Sources
                                </div>
                                <div className="item">
                                    <TreeView data={manageDataSource} options={{ selectable: false, enableLinks: false }} />
                                </div >
                            </Toast.Body>
                        </Toast>
                        <Toast >
                            <Toast.Body>
                                <div className="header">
                                    Manage Data
                                </div>
                                <div className="item">
                                    <TreeView data={manageData} options={{ selectable: false, enableLinks: false }} />
                                </div >

                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="home-body-main">
                        <div className="dashboard-panel">
                            <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Import Data Inventory</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Row>
                                        <Col sm={4}>
                                            Import Data Inventory
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Select value={selectedInventory?.id} onChange={onSelectInventory} aria-label="">
                                                <option >Select an inventory</option>
                                                {
                                                    inventories.map((v, idx) =>
                                                        <option key={"cat-" + idx} value={"" + v.id}>{v.name}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={4}>

                                        </Col>
                                        <Col sm={8} className="inventory-summary">
                                            Last Updated: Yesterday
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={4}>

                                        </Col>
                                        <Col sm={8} className="inventory-summary">
                                            Notes: This is final onboarding data inventory for Big City Airport
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
                                    <strong className="me-auto">Data Inventory</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Data Source Name</th>
                                                <th>Description</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedInventory ? selectedInventory.items.map((item: any) => {
                                                    return <tr>
                                                        <td><Form.Check type="checkbox" /></td>
                                                        <td>{item.dataSourceName}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.notes}</td>
                                                    </tr>
                                                }) : ""
                                            }
                                        </tbody>
                                    </Table>
                                    <div className="details-box">
                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>Data Source Name
                                            </Col>
                                            <Col className="details-value"  sm={9}>
                                                Transport System
                                            </Col>
                                        </Row>

                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>Description
                                            </Col>
                                            <Col className="details-value"  sm={9}>
                                                All Purchased Goods Transportation US, Canada
                                            </Col>
                                        </Row>

                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>Current Topics
                                            </Col>
                                            <Col className="details-value" style={{fontWeight:'bold'}} sm={4}>
                                                Environmental Sustainability Category
                                            </Col>
                                            <Col className="details-value" style={{fontWeight:'bold'}}  sm={5}>
                                                Scope of Data Coverage
                                            </Col>
                                        </Row>
                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>
                                            </Col>
                                            <Col className="details-control"  sm={4}>
                                                <Form.Check type="checkbox" id="carbon" checked={true} label={"Carbon"} />
                                            </Col>
                                            <Col className="details-control"  sm={5}>
                                                <Form.Check type="checkbox" id="coporate" checked={true} label={'Coporate'}/>
                                            </Col>
                                        </Row>
                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>
                                            </Col>
                                            <Col className="details-control"  sm={4}>
                                                <Form.Check type="checkbox" id="water"   label={"Water"} />
                                            </Col>
                                            <Col className="details-control"  sm={5}>
                                                <Form.Check type="checkbox" id="product" label={'Product'}/>
                                            </Col>
                                        </Row>
                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>
                                            </Col>
                                            <Col className="details-control"  sm={4}>
                                                <Form.Check type="checkbox" id="waster" label={"Waste"} />
                                            </Col>
                                            <Col className="details-control"  sm={5}>
                                                <Form.Check type="checkbox" id="process" label={'Process'}/>
                                            </Col>
                                        </Row>
                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>View Sample Data
                                            </Col>
                                            <Col className="details-value" sm={9}>
                                                <a href="/">Click here to see sample data</a>
                                            </Col>
                                        </Row>
                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>Review and approve
                                            </Col>
                                            <Col className="details-value" sm={9}>
                                                <a href="/">Classification and mapping by Viridium.AI</a>
                                            </Col>
                                        </Row>
                                        <Row className="details-row">
                                            <Col className="details-label"  sm={3}>Notes
                                            </Col>
                                            <Col className="details-value"  sm={9}>
                                                <Form.Control as="textarea" rows={2} />
                                            </Col>
                                        </Row>
                                        <Row className="details-row">
                                            <Col className="details-label" sm={8}>
                                            </Col>
                                            <Col className="details-btn" sm={4}>
                                                <Button >Submit Data Request</Button>
                                            </Col>
                                        </Row>
                                    </div>
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
