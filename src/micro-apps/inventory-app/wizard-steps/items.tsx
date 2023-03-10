import { useState } from "react";

import { Toast, Form, Row, Col } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Action } from "../../../components/wizard";
import { inventoryConfigApp } from "../inventory-app";
import { InventoryItem, getInventoryItem, updateInventoryItem } from "../inventory-common";

export const InventoryItems = (props: any) => {
    var configs = require('./configs.json');

    const [report, setInventoryItem] = useState<InventoryItem>(getInventoryItem());

    const onSelectScope1 = (evt: any) => {
        if (!report.scope1Needs.includes(evt.target.id)) {
            report.scope1Needs.push(evt.target.id);
        }
        let clone = { ...report };
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }

    const onSelectScope3 = (evt: any) => {
        if (!report.scope3Needs.includes(evt.target.id)) {
            report.scope3Needs.push(evt.target.id);
        }
        let clone = { ...report };
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }

    const scope1Category = (): Array<{ id: string, label: string }> => {
        return configs.categories.scope1.map((value: string, idx: number) => {
            return { id: "" + idx + 1, label: value }
        })
    };
    const scope3Category = (): Array<{ id: string, label: string }> => {
        return configs.categories.scope3.map((value: string, idx: number) => {
            return { id: "" + idx + 1, label: value }
        })
    };
    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <span className="me-auto">
                                    {report.companyName}
                                </span>
                                Viridium Industry:   {report.category}
                            </Toast.Header>
                            <Toast.Body>
                                <Row>
                                    <Col className="inventory-summary">
                                        Environmental Sustainability Category: {report.context}
                                    </Col>
                                    <Col className="inventory-summary">Scope of Data Coverage: {report.type}</Col>
                                </Row>
                                <Row>
                                    <Col className="inventory-summary">
                                        Standards: {report.standard}
                                    </Col>
                                    <Col className="inventory-summary">Regulations: N/A</Col>
                                </Row>
                                <Row>
                                    <Col className="inventory-title">
                                        Select Data Source Based on your knowledge of the Account
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="scope-category-box">
                                        <div className="scope-category-header">Scope 1/2 Needs</div>
                                        <div className="scope-category-content">
                                            {scope1Category().map((item, idx) => {
                                                return (
                                                    <div key={`default-${idx}`} className="mb-2">
                                                        <Form.Check
                                                            onChange={onSelectScope1}
                                                            type="checkbox"
                                                            id={item.id}
                                                            label={item.label}
                                                            checked={report.scope1Needs.includes(item.id)}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Col>
                                    <Col className="scope-category-box">
                                        <div className="scope-category-header">Scope 3 Needs</div>
                                        <div className="scope-category-content">{scope3Category().map((item, idx) => (
                                            <div key={`default-${idx}`} className="mb-2">
                                                <Form.Check
                                                    onChange={onSelectScope3}
                                                    type="checkbox"
                                                    id={item.id}
                                                    label={item.label}
                                                    checked={report.scope3Needs.includes(item.id)}
                                                />
                                            </div>
                                        ))}</div>
                                    </Col>
                                </Row>
                                <Action report={report}
                                    next={{ label: "Next", path: "/inventory-app/sources" }}
                                    prev={{ label: "Back", path: "/inventory-app/categories" }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}