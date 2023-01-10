import { Component, useState } from "react";

import { Toast, Form, Row, Col, Button, Tab, Tabs } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { DataTable } from "../../../components/table";
import { Action } from "../../../components/wizard";
import { inventoryConfigApp } from "../../inventory-app/inventory-app";
import { getConfigs, getInventory, Inventory, InventoryItem, updateInventory } from "./model";

type ItemState = {
    name: string,
    quantity: number,
    typeId: string,
    siteId: string,
    frequency: string,
    scope?: string,
    category?: string
}

type ItemProps = {
    inventory: Inventory,
    category: any,
    scope: any,
    onUpdate: Function
}
export class InventoryItemForm extends Component<ItemProps, ItemState> {
    constructor(props: any) {
        super(props);
        this.state = { name: "", quantity: 0, frequency: "yearly", siteId: "", typeId: "" };
    }
    componentDidMount(): void {
        this.setState({ name: "", quantity: 0, frequency: "yearly", siteId: "", typeId: "" })
    }
    onFreqChange = (evt: any) => {
        this.setState({ frequency: evt.target.value });
    }
    onSiteChange = (evt: any) => {
        this.setState({ siteId: evt.target.value });
    }
    onTypeChange = (evt: any) => {
        this.setState({ typeId: evt.target.value });
    }
    onNameChange = (evt: any) => {
        this.setState({ name: evt.target.value });
    }
    onQuantityChange = (evt: any) => {
        this.setState({ quantity: evt.target.value });
    }
    onAddItem = () => {
        let item = new InventoryItem();
        Object.assign(item, this.state);
        let inventory = this.props.inventory;
        inventory.addItem(item)
        this.props.onUpdate(inventory);
    }
    render = () => {
        let configs = getConfigs();
        let inventory = this.props.inventory;
        let scope = configs.scopes.find((s: any) => s.id === this.props.scope);
        let category = scope.categories.find((c: any) => c.id === this.props.category);
        return (
            <div className="import-container">
                <Row>
                    <Col className="wizard-form-label">Name</Col>
                    <Col className="wizard-form-input"><Form.Control placeholder="Item Name" value={this.state.name} type="text" onChange={this.onNameChange}></Form.Control></Col>
                </Row>
                <Row>
                    <Col className="wizard-form-label">Quantity</Col>
                    <Col className="wizard-form-input"><Form.Control placeholder="Quantity" value={this.state.quantity} type="text" onChange={this.onQuantityChange}></Form.Control></Col>
                </Row>
                <Row>
                    <Col className="wizard-form-label">Frequency</Col>
                    <Col className="wizard-form-input"><Form.Select key="itemFreq" value={this.state.frequency} onChange={this.onFreqChange}>
                        <>
                            <option value="">Select a frequency</option>
                            {
                                configs.frequencies?.map((freq: any, idx: number) => {
                                    return <option key={'freq' + idx} value={freq.id}>{freq.name}</option>
                                })
                            }
                        </>
                    </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col className="wizard-form-label">Type</Col>
                    <Col className="wizard-form-input"><Form.Select key="itemType" value={this.state.typeId} onChange={this.onTypeChange}>
                        <>
                            <option value="">Select a type</option>
                            {
                                category.types?.map((type: any, idx: number) => {
                                    return <option key={'type' + idx} value={type.id}>{category.name + " " + type.name}</option>
                                })
                            }
                        </>
                    </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col className="wizard-form-label">Site</Col>
                    <Col className="wizard-form-input">
                        <Form.Select key="itemSite" value={this.state.siteId} onChange={this.onSiteChange}>
                            <>
                                <option value="">Select a site</option>
                                {
                                    inventory.company?.sites?.map((site: any, idx: number) => {
                                        return <option key={'site' + idx} value={site.id}>{site.name}</option>
                                    })
                                }
                            </>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className="form-btn">
                        <Button disabled={true} onClick={this.onAddItem}>Add</Button>
                    </Col>
                </Row>
            </div>
        )
    };
}

export const FileUploader = (props: any) => {
    const [item, setItem] = useState<InventoryItem>(new InventoryItem());

    const ui = () => {
        return (
            <div className="import-container">
                TSV file uploader here<p />
            </div>
        )
    };
    return ui();
}

export const ConnectorConfig = (props: any) => {
    const ui = () => {
        return (
            <div className="import-container">
                Select Viridium Connectors
            </div>
        )
    };
    return ui();
}

export const InventoryItemView = (props: any) => {
    let item: InventoryItem = props.item;
    let mode = props.mode;
    const rowUI = () => {
        return (
            <Row>
                <Col>{item.name}</Col>
                <Col>{item.quantity}</Col>
                <Col>{item.frequency}</Col>
                <Col>{item.siteId}</Col>
                <Col>{item.typeId}</Col>
            </Row>
        )
    };
    const entityUI = () => {
        return (
            <div>
                <Row>
                    <Col>Id</Col>
                    <Col>{item.id}</Col>
                </Row>
                <Row>
                    <Col>Name</Col>
                    <Col>{item.name}</Col>
                </Row>
                <Row>
                    <Col>Quantitiy</Col>
                    <Col>{item.quantity}</Col>
                </Row>
                <Row>
                    <Col>Frequency</Col>
                    <Col>{item.frequency}</Col>
                </Row>
                <Row>
                    <Col>Type</Col>
                    <Col>{item.typeId}</Col>
                </Row>
                <Row>
                    <Col>Site</Col>
                    <Col>{item.siteId}</Col>
                </Row>
            </div>
        )
    };
    return mode === 'row' ? rowUI() : entityUI();
}

export const InventoryItemsView = (props: any) => {
    const configs = getConfigs();
    const [inventory, setInventory] = useState<Inventory>(getInventory());
    const [scope, setScope] = useState<string>("1");
    const [category, setCategory] = useState<string>("1");
    const onSelectScope = (evt: any) => {
        setScope(evt.target.value);
    }
    const onSelectCategory = (evt: any) => {
        setCategory(evt.target.value);
    }

    const onUpdate = (inventory: Inventory) => {
        let newInv = Inventory.new(inventory)!
        setInventory(newInv);
        updateInventory(newInv)
    }

    const getInventoryItemsData = () => {
        return {
            id: inventory.id,
            headers: [
                { type: "text", text: "Name" },
                { type: "text", text: "Quantity" },
                { type: "text", text: "Frequency" },
                { type: "text", text: "Type" },
                { type: "text", text: "Site" }
            ],
            rows: inventory.items.map((item, idx) => {
                return {
                    id: item.id,
                    cols: [{ type: "text", text: item.name },
                    { type: "text", text: item.quantity },
                    { type: "text", text: item.frequency },
                    { type: "text", text: item.typeId },
                    { type: "text", text: item.siteId }
                    ]
                }
            }
            )
        }
    }

    const ui = () => {
        let scopes = configs.scopes;
        let selectedScope = scopes.find((s: any) => s.id === scope);
        let categories = selectedScope?.categories;
        let items = inventory.items;
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                <div className="wizard-body">
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                Manage Items
                            </span>
                            {inventory.company.name}
                        </Toast.Header>
                        <Toast.Body>
                            <Row>
                                <Col className="inventory-summary">
                                    <Form.Select value={scope} onChange={onSelectScope}>
                                        <>
                                            <option value=''>Select a Scope</option>
                                            {
                                                scopes.map((scope: any, idx: number) => {
                                                    return (
                                                        <option key={`cat-${idx}`} className="mb-2" value={scope.id}>
                                                            {scope.name}
                                                        </option>
                                                    )
                                                })

                                            }
                                        </>
                                    </Form.Select>
                                </Col>
                                <Col className="inventory-summary">
                                    <Form.Select value={category} onChange={onSelectCategory}>
                                        <>
                                            <option value=''>{selectedScope !== undefined ? 'Select a category' : 'Please select a scope'}</option>
                                            {
                                                categories?.map((category: any, idx: number) => {
                                                    return (
                                                        <option key={`cat-${idx}`} className="mb-2" value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Tabs defaultActiveKey="manual">
                                        <Tab eventKey="manual" title="Manual">
                                            <InventoryItemForm inventory={inventory} scope={scope} category={category} onUpdate={onUpdate} />
                                        </Tab>
                                        <Tab eventKey="file" title="File Uploader">
                                            <FileUploader inventory={inventory} scope={scope} category={category} onUpdate={onUpdate} />
                                        </Tab>
                                        <Tab eventKey="connector" title="Connector">
                                            <ConnectorConfig inventory={inventory} scope={scope} category={category} onUpdate={onUpdate} />
                                        </Tab>
                                    </Tabs>

                                </Col>
                            </Row>
                            {
                                items.length > 0 ? <Row>
                                    <Col>
                                        <DataTable data={getInventoryItemsData()} onSelectRow={() => { }} />
                                    </Col>
                                </Row> : ""
                            }
                            <Action inventory={inventory}
                                next={{ label: "Next", path: props.next }}
                                prev={{ label: "Back", path: props.prev }} />
                        </Toast.Body>
                    </Toast>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}