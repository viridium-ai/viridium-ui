import { useState } from "react";

import { Toast, Table, Form, Col, Row } from "react-bootstrap";
import { LayoutPage } from "../../../common/layout";
import { Action } from "../../../common/wizard";
import { inventoryConfigApp } from "../inventory-app";
import { InventoryItem, getInventoryItem } from "../inventory-common";

export const FunctionalTable = (props: any) => {
    const ui = () => {
        return (
            <Table className="analytic-table">
                <>
                    <thead>
                        <tr>
                            {
                                props.headers.map((header: any, idx: number) =>
                                    <th key={"header-" + idx} className={"analytic-header analytic-col-" + idx}>{header}</th>
                                )
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {props.children}
                    </tbody>
                </>
            </Table>
        )
    }
    return ui();
}

export const FunctionalRow = (props: any) => {
    const ui = () => {
        return (
            <tr className="analytic-row" >
                {
                    props.cols.map((dim: any, idx: number) =>
                        <td key={"col-" + idx} className={"analytic-dim-" + idx}>{dim}</td>
                    )
                }
            </tr>)
    }
    return ui();
}


export const FunctionCategories = (props: any) => {
    var configs = require('./configs.json');

    const [report] = useState<InventoryItem>(getInventoryItem());
    const [categoryFunctions, setCategoryFunctions] = useState<Array<{ id: string, value: string }>>([]);
    const [selectedCategory, setCategory] = useState("");

    const [selectedFunction, setSelectedFunction] = useState();

    const categories: Array<{ id: string, value: string, functions: Array<string> }> = configs.functionCategories.lookups;

    const selectCategory = (value: string) => {
        let cat = categories.find(cat => cat.id === value);
        if (cat) {
            setCategoryFunctions(cat.functions.map(f => { return { id: f, value: f } }));
            setCategory(cat.id);
        }
    }

    const onSelectCategory = (event: any) => {
        selectCategory(event.target.value);
    }

    const onSelectFunction = (event: any) => {
        setSelectedFunction(event.target.value);
    }

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
                                    <Col> &nbsp;</Col>
                                </Row>
                                <Row className="inventory-filters">
                                    <Col className="inventory-summary">Viridium.AI's Airport Value Chain:
                                    </Col>
                                    <Col className="inventory-summary">
                                        <Row>
                                            <Col>
                                                Function Category:
                                                <Form.Select value={selectedCategory} onChange={onSelectCategory} aria-label="">
                                                    {
                                                        categories.map((v, idx) =>
                                                            <option key={"cat-" + idx} value={"" + v.id}>{v.value}</option>
                                                        )
                                                    }
                                                </Form.Select>
                                            </Col>
                                            <Col>
                                                Function 1.0:
                                                <Form.Select value={selectedFunction} onChange={onSelectFunction} aria-label="">
                                                    <option key={"func-0"} value={""}>Select a Function</option>
                                                    {
                                                        categoryFunctions.map((v, idx) =>
                                                            <option key={"func-" + idx} value={"" + v.value}>{v.value}</option>
                                                        )
                                                    }
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FunctionalTable title="Function categories" headers={configs.functionCategories.headers}>
                                            {
                                                configs.functionCategories.values.map((row: any, idx: number) => {
                                                    return <FunctionalRow
                                                        key={"row-" + idx} cols={row} />
                                                })
                                            }
                                        </FunctionalTable>
                                    </Col>
                                </Row>
                                <Action
                                    next={{ label: "Next", path: "/inventory-app/items" }}
                                    prev={{ label: "Back", path: "/inventory-app/config" }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }

    return ui();
}