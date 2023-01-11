import { Component, useState } from "react";

import { Toast, Form, Row, Col, Button, Tab, Tabs } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { DataTable } from "../../../components/table";
import { Action } from "../../../components/wizard";
import { getCompany, getConfigs, getInventory, updateInventory } from "../../../config/viridium-config";
import { inventoryConfigApp } from "../../inventory-app/inventory-app";
import { Company, Inventory, InventoryItem } from "./model";

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
        this.state = { name: "", quantity: 1000, frequency: "yearly", siteId: "1", typeId: "1" };
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

    onQuantityChange = (evt: any) => {
        this.setState({ quantity: evt.target.value });
    }
    onAddItem = () => {
        let item = new InventoryItem();
        Object.assign(item, this.state);
        item.scope = this.props.scope;
        item.category = this.props.category;
        let inv = getInventory();
        inv.addItem(item);
        this.props.onUpdate(inv);
    }
    render = () => {
        let configs = getConfigs();
        let company = getCompany();
        let scope = configs.scopes.find((s: any) => s.id === this.props.scope);
        let category = scope.categories.find((c: any) => c.id === this.props.category);
        let type = category.types?.find((t: any) => t.id === this.state.typeId);
        return (
            <div className="import-container">
                <Row>
                    <Col sm={3} className="wizard-form-label">Type</Col>
                    <Col sm={8} className="wizard-form-input">
                        <Form.Select key="itemType" value={this.state.typeId} onChange={this.onTypeChange}>
                        <>
                            <option value="">Select a type</option>
                            {
                                category.types?.map((type: any, idx: number) => {
                                    return <option key={'type' + idx} value={type.id}>{type.name}</option>
                                })
                            }
                        </>
                    </Form.Select>
                    </Col>
                    <Col sm={1} className="wizard-form-label"></Col>
                </Row>
                <Row>
                    <Col sm={3} className="wizard-form-label">Quantity</Col>
                    <Col sm={7} className="wizard-form-input">
                        <Form.Control placeholder="Quantity" value={this.state.quantity} type="text" onChange={this.onQuantityChange}></Form.Control>
                    </Col>
                    <Col sm={1} className="wizard-form-label">{type?.unit ? type.unit : ""}</Col>
                    <Col sm={1} className="wizard-form-label"></Col>
                </Row>
                <Row>
                    <Col sm={3} className="wizard-form-label">Frequency</Col>
                    <Col sm={8} className="wizard-form-input"><Form.Select key="itemFreq" value={this.state.frequency} onChange={this.onFreqChange}>
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
                    <Col sm={1} className="wizard-form-label"></Col>
                </Row>
                <Row>
                    <Col sm={3} className="wizard-form-label">Site</Col>
                    <Col sm={8} className="wizard-form-input">
                        <Form.Select key="itemSite" value={this.state.siteId} onChange={this.onSiteChange}>
                            <>
                                <option value="">Select a site</option>
                                {
                                    company?.sites?.map((site: any, idx: number) => {
                                        return <option key={'site' + idx} value={site.id}>{site.name}</option>
                                    })
                                }
                            </>
                        </Form.Select>
                    </Col>
                    <Col sm={1} className="wizard-form-label"></Col>
                </Row>
                <Row>
                    <Col sm={3}></Col>
                    <Col className="form-btn">
                        <Button disabled={type === undefined} onClick={this.onAddItem}>Add</Button>
                    </Col>
                    <Col sm={1} className="wizard-form-label"></Col>
                </Row>
            </div>
        )
    };
}

export const FileUploader = (props: any) => {
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
                <Col>{item.typeId}</Col>
                <Col>{item.quantity}</Col>
                <Col>{item.frequency}</Col>
                <Col>{item.siteId}</Col>
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
                    <Col>Quantity</Col>
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
    const [company] = useState<Company | undefined>(Company.new(getCompany()));
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

    const clearItems = () => {
        let newInv = Inventory.new(inventory)!
        newInv.items = [];
        setInventory(newInv);
        updateInventory(newInv)
    }

    const getInventoryItemsData = () => {
        return {
            id: inventory.id,
            headers: [
                { type: "text", text: "Type" },
                { type: "text", text: "Quantity" },
                { type: "text", text: "Unit" },
                { type: "text", text: "Scope" },
                { type: "text", text: "Category" },
                { type: "text", text: "Frequency" },
                { type: "text", text: "Site" }
            ],
            rows: inventory.items.map((item, idx) => {
                const site = company?.getSite(item.siteId);
                const frequency = configs.frequencies.find((f:any) => f.id === item.frequency);
                const quantity = item.quantity;
                const scope = configs.scopes.find((scope:any) => scope.id === item.scope);
                const category = scope.categories?.find((cat:any) => cat.id ===item.category);
                const type = category?.types?.find((t:any) => t.id === item.typeId);

                return {
                    id: item.id,
                    cols: [
                        { type: "text", text: type?.name },
                        { type: "text", text: quantity },
                        { type: "text", text: type?.unit },
                        { type: "text", text: scope.name },
                        { type: "text", text: category?.name },
                        { type: "text", text: frequency?.name },
                        { type: "text", text: site?.name }
                    ]
                }
            }
            )
        }
    }

    const itemForm = () => {
        let scopes = configs.scopes;
        let selectedScope = scopes.find((s: any) => s.id === scope);
        let categories = selectedScope?.categories;
        return (<>
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
            </Row></>)
    }

    const ui = () => {
        let items = inventory.items;
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                <div className="wizard-body">
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                Manage Inventory Items
                            </span>
                            <span className="button" onClick={clearItems}>Clear All</span>
                        </Toast.Header>
                        <Toast.Body>
                            {
                                itemForm()
                            }
                            {
                                items.length > 0 ? <Row>
                                    <Col>
                                        <DataTable data={getInventoryItemsData()} />
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