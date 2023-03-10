import React from 'react';
import { useState } from 'react';
import { Toast, Table, Form, Col, Row, Button } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout';
import TreeView from '../../components/tree-view';
import { dataSourceManager } from './dm-app';
interface Inventory {
    id: string,
    name: string,
    items: Array<InventoryItem>,
    notes: string,
    updatedAt: string,
    status: string,
    updatedBy: string
}
interface InventoryItem {
    id: string,
    dataSourceName: string,
    description: string,
    notes: string
}

interface SourceDetailsState {
    row: any
}
interface SourceDetailsProps {
    row: any
}

interface DataTableProps {
    data: any,
    onSelectRow: Function
}
interface DataTableState {
    data: any
}
class DataTable extends React.Component<DataTableProps, DataTableState> {
    constructor(props: DataTableProps) {
        super(props);
        this.state = { data: props.data };
    }
    componentDidUpdate = (data: DataTableProps) => {
        if (this.props.data.id !== data.data.id) {
            this.setState({ data: this.props.data });
        }
    }
    onSelectRow = (evt: any) => {
        evt.preventDefault();
        evt.stopePropagation();
        if (this.props.onSelectRow) {
            this.props.onSelectRow(evt.currentTarget.id);
        }
    }
    render = () => {
        let tableData = this.state.data;
        return (
            <Table bordered hover size="sm">
                <thead>
                    <tr >
                        {
                            tableData.headers.map((col: any, idx: number) => {
                                return <th key={'h' + idx}>{col.type === 'checkbox' ? <Form.Check type="checkbox" /> : col.text
                                }</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.rows.map((row: any, idx: number) => {
                            return <tr key={'r' + idx} onClick={this.onSelectRow} id={row.id}>
                                {
                                    row.cols.map((col: any, jdx: number) => {
                                        return <td className={"data-cell-"+col.type} key={'c' + jdx}>{col.type === 'checkbox' ? <Form.Check checked={col.value} type="checkbox" />
                                            : (col.type === 'button' ? <Button onClick={col.onClick} >{col.text}</Button>
                                                : col.text)
                                        }</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        );
    }
}
class SourceDetails extends React.Component<SourceDetailsProps, SourceDetailsState> {
    constructor(props: SourceDetailsProps) {
        super(props);
        this.state = { row: props.row };
    }
    onUpdateScope = (evt: any) => {

    }
    componentDidUpdate = (prevRow: SourceDetailsProps) => {
        if (this.props.row.id !== prevRow.row.id) {
            this.setState({ row: this.props.row });
        }
    }
    notesChanged = (evt: any) => {

    }
    onUpdateCategory = (evt: any) => {

    }
    render() {
        return (
            <div className="details-box">
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Data Source Name
                    </Col>
                    <Col className="details-value" sm={9}>
                        {this.state.row.dataSourceName}
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Description
                    </Col>
                    <Col className="details-value" sm={9}>
                        {this.state.row.description}
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Current Topics
                    </Col>
                    <Col className="details-value" style={{ fontWeight: 'bold' }} sm={4}>
                        Environmental Sustainability Category
                    </Col>
                    <Col className="details-value" style={{ fontWeight: 'bold' }} sm={5}>
                        Scope of Data Coverage
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>
                    </Col>
                    <Col className="details-control" sm={4}>
                        <Form.Check type="checkbox" id="carbon" onChange={this.onUpdateCategory} checked={true} label={"Carbon"} />
                    </Col>
                    <Col className="details-control" sm={5}>
                        <Form.Check type="checkbox" id="corporate" onChange={this.onUpdateScope} checked={true} label={'Corporate'} />
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>
                    </Col>
                    <Col className="details-control" sm={4}>
                        <Form.Check type="checkbox" onChange={this.onUpdateCategory} id="water" label={"Water"} />
                    </Col>
                    <Col className="details-control" sm={5}>
                        <Form.Check type="checkbox" onChange={this.onUpdateScope} id="product" label={'Product'} />
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>
                    </Col>
                    <Col className="details-control" sm={4}>
                        <Form.Check type="checkbox" onChange={this.onUpdateCategory} id="waster" label={"Waste"} />
                    </Col>
                    <Col className="details-control" sm={5}>
                        <Form.Check type="checkbox" onChange={this.onUpdateScope} id="process" label={'Process'} />
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>View Sample Data
                    </Col>
                    <Col className="details-value" sm={9}>
                        <a href="/">Click here to see sample data</a>
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Review and approve
                    </Col>
                    <Col className="details-value" sm={9}>
                        <a href="/">Classification and mapping by Viridium.AI</a>
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Notes
                    </Col>
                    <Col className="details-value" sm={9}>
                        <Form.Control as="textarea" onChange={this.notesChanged} value={this.state.row.notes} rows={2} />
                    </Col>
                </Row>
                <Row className="details-action-row">
                    <Col className="details-label" sm={8}>
                    </Col>
                    <Col className="details-btn" sm={4}>
                        <Button >Submit Data Request</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
class SourceConfigDetails extends React.Component<SourceDetailsProps, SourceDetailsState> {
    constructor(props: SourceDetailsProps) {
        super(props);
        this.state = { row: props.row };
    }
    onUpdateScope = (evt: any) => {

    }
    componentDidUpdate = (prevRow: SourceDetailsProps) => {
        if (this.props.row.id !== prevRow.row.id) {
            this.setState({ row: this.props.row });
        }
    }
    notesChanged = (evt: any) => {

    }
    onUpdateCategory = (evt: any) => {

    }
    render() {
        return (
            <div className="details-box">
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Data Source Name</Col>
                    <Col className="details-value" sm={9}>{this.state.row.dataSourceName}</Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Description</Col>
                    <Col className="details-value" sm={9}>{this.state.row.description}</Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>API Configuration</Col>
                    <Col className="details-value" sm={6}>
                        <Form.Control type="text" id="apiUrl" onChange={this.onUpdateCategory} placeholder={"API URL"} />
                    </Col>
                    <Col className="details-value" sm={3}>
                        <Form.Select id="authType" onChange={this.onUpdateScope} >
                            <option >Select a auth type</option>
                            <option value="0">Username/password</option>
                            <option value="1">SSH Key</option>
                            <option value="2">JWT</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>
                    </Col>
                    <Col className="details-value" sm={4}>
                        <Form.Control type="text" id="apiUrl" onChange={this.onUpdateCategory} placeholder={"User Name"} />
                    </Col>
                    <Col className="details-value" sm={5}>
                        <Form.Control type="password" id="apiUrl" onChange={this.onUpdateCategory} placeholder={"Password"} />
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>
                    </Col>
                    <Col className="details-value" sm={9}>
                        <Form.Control type="text" value="Server Certificate Validation, Auth Headers, Parameters, Advanced" id="apiUrl" onChange={this.onUpdateCategory} placeholder={"User Name"} />

                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Test Connection
                    </Col>
                    <Col className="details-value" sm={9}>
                        <a href="/">Click here to test</a>
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={3}>Notes
                    </Col>
                    <Col className="details-value" sm={9}>
                        <Form.Control as="textarea" onChange={this.notesChanged} value={this.state.row.notes} rows={2} />
                    </Col>
                </Row>
                <Row className="details-row">
                    <Col className="details-label" sm={8}>
                    </Col>
                    <Col className="details-btn" sm={4}>
                        <Button >Submit</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
interface SourceInventoryProps {
    inventory: Inventory
}
interface SourceInventoryState {
    inventory: Inventory,
    selectedRow?: InventoryItem
}
class SourceInventory extends React.Component<SourceInventoryProps, SourceInventoryState> {
    constructor(props: SourceInventoryProps) {
        super(props);
        this.state = { inventory: props.inventory, selectedRow: props.inventory.items[0] };
    }

    onUpdateScope = (evt: any) => {

    }

    componentDidUpdate = (prevRow: SourceInventoryProps) => {
        if (this.props.inventory.id !== prevRow.inventory.id) {
            this.setState({ inventory: this.props.inventory });
        }
    }

    onSelectInventoryItem = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        let rowId = event.currentTarget.id;
        let row = this.state.inventory?.items.find((item) => item.id === rowId);
        this.setState({ selectedRow: row });
    }

    onAction = (evt: any) => {
        console.log('button clicked');
    }

    getTableData = () => {
        let selectedInventory: Inventory = this.state.inventory;
        return selectedInventory.status === 'Uploaded' ? {
            id: selectedInventory.id,
            headers: [
                { type: "text", text: "Select" },
                { type: "text", text: "Data Source Name" },
                { type: "text", text: "Description" },
                { type: "text", text: "Notes" }],
            rows: selectedInventory.items.map((item: any, idx: number) => {
                return {
                    cols: [
                        { type: "checkbox", text: "", value: false },
                        { type: "text", text: item.dataSourceName },
                        { type: "text", text: item.description },
                        { type: "text", text: item.notes }
                    ]
                }
            })
        } : {
            id: selectedInventory.id,
            headers: [
                { type: "text", text: "Select" },
                { type: "text", text: "Data Source System" },
                { type: "text", text: "Tech" },
                { type: "text", text: "Type" },
                { type: "text", text: "Integration Status" },
                { type: "text", text: "Action" }],
            rows: selectedInventory.items.map((item: any, idx: number) => {
                return {
                    cols: [
                        { type: "checkbox", text: "", value: false },
                        { type: "text", text: item.dataSourceName },
                        { type: "text", text: item.type },
                        { type: "text", text: item.tech },
                        { type: "checkbox", value: item.status === 1, },
                        { type: "button", onClick: this.onAction, text: "Update" }
                    ]
                }
            })
        }
    }
    render() {
        let selectedInventory: Inventory = this.state.inventory;
        return (
            <div className="dashboard-panel">
                {
                    selectedInventory ? <Toast >
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Data Inventory</strong>
                        </Toast.Header>
                        <Toast.Body>
                            <DataTable data={this.getTableData()} onSelectRow={this.onSelectInventoryItem} />
                            {
                                selectedInventory.status === 'Uploaded' ?
                                    <SourceConfigDetails row={{ ...this.state.selectedRow }} /> :
                                    <SourceDetails row={{ ...this.state.selectedRow }} />
                            }
                        </Toast.Body>
                    </Toast> : <div></div>
                }
            </div>
        );
    }
}
export const SourceManager = (props: any) => {
    const [selectedInventory, setInventory] = useState<Inventory>();
    var configs = require('./configs.json');
    var manageDataSource = configs.manageDataSource;
    var manageData = configs.manageData;
    const inventories: Array<Inventory> = configs.inventory;

    const onSelectInventory = (evt: any) => {
        let inventoryId = evt.target.value;
        let inventory = inventories.find((inv: any) => inventoryId === inv.id);
        if (inventory) {
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
                                    {<Row>
                                        <Col sm={4}>Import Data Inventory</Col>
                                        <Col sm={8}>
                                            <Form.Select value={selectedInventory?.id} onChange={onSelectInventory} aria-label="">
                                                <option >Select an inventory</option>
                                                {
                                                    inventories.map((v, idx) => <option key={"cat-" + idx} value={"" + v.id}>{v.name}</option>)
                                                }
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    }
                                    {
                                        selectedInventory ? <>
                                            <Row>
                                                <Col sm={4}></Col>
                                                <Col sm={8} className="inventory-summary">
                                                    {selectedInventory.status} at {selectedInventory.updatedAt} by {selectedInventory.updatedBy}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}></Col>
                                                <Col sm={8} className="inventory-summary">
                                                    Notes: {selectedInventory ? selectedInventory.notes : " "}
                                                </Col>
                                            </Row>
                                        </> : <></>
                                    }

                                </Toast.Body>
                            </Toast>
                        </div>
                        <div className="dashboard-panel">
                            {
                                selectedInventory ? <SourceInventory inventory={selectedInventory} /> : <div />
                            }
                        </div>
                    </div>
                </div>
            </LayoutPage>
        )
    }
    return ui();
}
