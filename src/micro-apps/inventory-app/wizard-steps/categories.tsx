import { useState } from "react";

import { Toast, Table, Form, Col, Row } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { DimensionView } from "../../../components/table";
import { Action } from "../../../components/wizard";
import { getConfigs } from "../../../config/viridium-config";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire } from "../inventory-common";

export const CategoryTable = (props: any) => {
    const ui = () => {
        return (
            <Table className="analytic-table">
                <>
                    <thead>
                        <tr>
                            {
                                props.selectable ? <th className={"analytic-header analytic-col-checkbox"}>Select</th> : ""

                            }
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

export const CategoryRow = (props: any) => {
    const ui = () => {
        return (
            <tr className="analytic-row" >
                {
                    props.selectable ? <td><Form.Check type="checkbox" onChange={props.onSelect} /> </td> : ""
                }
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
    var configs = getConfigs();

    const [report] = useState<Questionnaire>(getQuestionnaire());
    const [subCategories, setSubCategories] = useState<Array<{ id: string, label: string }>>([]);
    const [selectedCategory, setCategory] = useState("");

    const [selectedSubCategory, setSubCategory] = useState("");

    const categories: Array<{ id: string, label: string, categories: Array<{ id: string, label: string }> }> = configs.valueChain.categories;

    const selectCategory = (v: any) => {
        if (v) {
            let c = categories.find(cat => cat.id === v.id);
            if (c) {
                setSubCategories(c.categories);
                setCategory(c.id);
            } else {
                setCategory("");
                setSubCategories([]);
            }
        } else {
            setCategory("");
            setSubCategories([]);
        }

    }

    const onSelectCategory = (v: any) => {
        selectCategory(v);
    }

    const onSelectSubCategory = (v: any) => {
        setSubCategory(v ? v.id : "");
    }
    const onSelectFunctionCategory = (event: any) => {

    }
    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                <div className="v-body">
                    <div className="v-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <span className="me-auto">
                                    {report.companyName}
                                </span>
                                Viridium Industry:   {report.category}
                            </Toast.Header>
                            <Toast.Body>
                                <Row>
                                    <Col className="v-summary">
                                        Environmental Sustainability Category: {report.context}
                                    </Col>
                                    <Col className="v-summary">Scope of Data Coverage: {report.type}</Col>
                                </Row>
                                <Row>
                                    <Col className="v-summary">
                                        Standards: {report.standard}
                                    </Col>
                                    <Col className="v-summary">Regulations: N/A</Col>
                                </Row>
                                <Row className="inventory-filters">
                                    <Col className="v-summary">Airport Value Chain:
                                    </Col>
                                    <Col className="v-summary">
                                        <Row>
                                            <Col>
                                                <DimensionView data={categories} options={{ value: selectedCategory, placeHolder: "Select a Category", label: "Master Categories", onSelectValue: onSelectCategory }} />
                                            </Col>
                                            <Col>
                                                <DimensionView data={subCategories} options={{ value: selectedSubCategory, placeHolder: "Select a Category", label: "Categories", onSelectValue: onSelectSubCategory }} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col> &nbsp;</Col>
                                </Row>
                                <Row >
                                    <Col>
                                        {selectedCategory !== "" ?
                                            <CategoryTable title="Categories" headers={configs.valueChain.headers} selectable={true}>
                                                {
                                                    configs.valueChain.values.filter((row: any) => {
                                                        const category = categories.find((cat) => selectedCategory === cat.id);
                                                        const f = subCategories.find((f) => selectedSubCategory === f.id);
                                                        return category?.label === row[0] && (f === undefined ? true : f.label === row[1]);
                                                    }).map((row: any, idx: number) => {
                                                        return <CategoryRow onChange={onSelectFunctionCategory} selectable={true}
                                                            key={"row-" + idx} cols={row} />
                                                    })
                                                }
                                            </CategoryTable> : <div>Please select a category</div>
                                        }
                                    </Col>
                                </Row>
                                <Action
                                    next={{ label: "Next", path: props.next }}
                                    prev={{ label: "Back", path: props.prev }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }

    return ui();
}