import { useState } from "react";
import { Toast, Form, Col, Row } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { DataTable } from "../../../components/table";
import { Action } from "../../../components/wizard";
import { getConfigs } from "../../../config/viridium-config";
import { greenHouseApp } from "../ghg-app";
import { Inventory } from "./model";

export const InventorySummary = (props: any) => {
    const configs = getConfigs();
    const [inventory, setInventory] = useState<Inventory>(props.inventory);
    const [scope, setScope] = useState<string>("1");
    const [category, setCategory] = useState<string>("1");
    const onSelectScope = (evt: any) => {
        setScope(evt.target.value);
    }
    const onSelectCategory = (evt: any) => {
        setCategory(evt.target.value);
    }

    const getInventoryItemsData = () => {
        return {
            id: inventory.id,
            headers: [
                { type: "text", text: "Quantity" },
                { type: "text", text: "Frequency" },
                { type: "text", text: "Type" },
                { type: "text", text: "Site" }
            ],
            rows: inventory.items.map((item, idx) => {
                return {
                    id: item.id,
                    cols: [
                        { type: "text", text: item.siteId },
                        { type: "text", text: item.quantity },
                        { type: "text", text: item.frequency },
                        { type: "text", text: item.typeId },
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
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                <div className={`${greenHouseApp.getName}`}>
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                Summary and Review
                            </span>
                            {inventory.company?.name}
                        </Toast.Header>
                        <Toast.Body>
                            <Row>
                                <Col className="v-summary">
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
                                <Col className="v-summary">
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
