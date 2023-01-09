import { useState } from "react";
import { Toast, Form, Col, Row } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Action } from "../../../components/wizard";
import { DataTable } from "../../dm-app/source-manager";
import { inventoryConfigApp } from "../../inventory-app/inventory-app";
import { Inventory, getInventory, updateInventory, getConfigs } from "./model";

export const InventorySummary = (props: any) => {
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
        setInventory({ ...inventory });
        updateInventory(inventory);
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
                                Summary and Review
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
