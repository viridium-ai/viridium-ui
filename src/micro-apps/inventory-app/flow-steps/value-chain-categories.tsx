
import { useState } from "react";

import { Toast, Col, Row, Form } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DataTable, DimensionView } from "../../../components/v-table/v-table-1";
import { StringUtils } from "../../../components/v-utils/v-string-utils";

import { getConfigs, getTreeData, getValueChainConfigs } from "../../../config/v-config";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire } from "../inventory-questionaire";

export const QuestionniarView = (props: any) => {
    const [report] = useState<Questionnaire>(getQuestionnaire());
    return (
        <>
            <Row>
                <Col className="v-summary">
                    Environmental Sustainability Category: {Questionnaire.getType(report)}
                </Col>
                <Col className="v-summary">Scope of Data Coverage: {Questionnaire.getContext(report)}</Col>
            </Row>
            <Row>
                <Col className="v-summary">
                    Standards: {Questionnaire.getStandard(report)}
                </Col>
                <Col className="v-summary">Regulations: {Questionnaire.getRegulation(report)}</Col>
            </Row>
        </>
    )
}

export const ValueChainCategories1 = (props: any) => {
    var configs = getConfigs();
    const [report] = useState<Questionnaire>(getQuestionnaire());
    const [subCategories, setSubCategories] = useState<Array<{ id: string, label: string }>>([]);
    const [selectedCategory, setCategory] = useState("");
    const [selectedSubCategory, setSubCategory] = useState("");
    const categories: Array<{ id: string, label: string, categories: Array<{ id: string, label: string }> }>
        = configs.valueChain.categories;
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

    const getSitesData = () => {

        const filtered = configs.valueChain.values.filter((row: any) => {
            const category = categories.find((cat) => selectedCategory === cat.id);
            const f = subCategories.find((f) => selectedSubCategory === f.id);
            return category?.label === row[0] && (f === undefined ? true : f.label === row[1]);
        });

        return {
            id: "",
            headers: configs.valueChain.headers.map((v: any, idx: number) => {
                return { id: idx, text: v }
            }),
            rows: filtered.map((v: any, idx: number) => {
                return {
                    id: 'r' + idx,
                    cols: [{
                        id: "select" + idx,
                        text: "Select",
                        type: "checkbox"
                    }, ...[v[2], v[3]].map((c: any, jdx: number) => {
                        return {
                            id: 'c' + jdx,
                            text: c
                        }
                    }), {
                        id: "carbon" + idx,
                        text: "Select",
                        type: "checkbox"
                    }, {
                        id: "waster" + idx,
                        text: "Select",
                        type: "checkbox"
                    }, {
                        id: "water" + idx,
                        text: "Select",
                        type: "checkbox"
                    }]
                }
            })
        }
    }

    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {report.companyName}
                        </span>
                        Viridium Industry:   {report.category}
                    </Toast.Header>
                    <Toast.Body>
                        <QuestionniarView />
                        <Row className="v-filters">
                            <Col className="v-summary">
                                <Row>
                                    <Col>Value Chain:</Col>
                                </Row>
                                <Row>
                                    <Form.Group style={{ padding: "1em" }}>
                                        <Form.Check type="checkbox" inline checked={true} label="Company" id="companyOrPartner" />
                                        <Form.Check type="checkbox" inline checked={false} label={"Partners"} id="companyOrPartner" />
                                    </Form.Group>
                                </Row>
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
                                {
                                    selectedCategory !== "" ? <DataTable data={getSitesData()} /> : <div>Please select a category</div>
                                }
                            </Col>
                        </Row>
                        <Action
                            next={{ label: "Next", path: props.next }}
                            prev={{ label: "Back", path: props.prev }} />
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
    return ui();
}

const taxonomy = getTreeData();

const categories = taxonomy.children.map((v: any) => {
    return {
        id: v.id,
        value: v.id,
        label: v.text
    }
});

const getCategory = (id: string) => {
    return taxonomy.children.find((cat: any) => cat.id === id);
};
const getAccountable = () => {
    return getValueChainConfigs()["accountable"];
};
const getSubcategories = (entity: any) => {
    return entity.children.map((v: any) => {
        return {
            id: v.id,
            value: v.id,
            label: v.text
        }
    })
};

const getSubCategory = (id: string) => {
    let foundCat: any = undefined;
    taxonomy.children.forEach((cat: any) => {
        let f = cat.children.find((subcat: any) => subcat.id === id);
        if (f) {
            foundCat = f;
        }
    });
    return foundCat;
};

export const ValueChainCategories = (props: any) => {
    var configs = getConfigs();
    const [report] = useState<Questionnaire>(getQuestionnaire());
    const [subCategories, setSubCategories] = useState<Array<{ id: string, label: string }>>([]);
    const [tertiaryCategories, setTertiaryCategories] = useState<Array<{ id: string, label: string }>>([]);

    const [selectedCategory, setCategory] = useState("");
    const [selectedSubCategory, setSubCategory] = useState("");
    const [selectedTertiaryCategory, setTertiaryCategory] = useState("");

    const selectCategory = (v: any) => {
        if (v) {
            let c = getCategory(v.id);
            if (c) {
                setSubCategories(getSubcategories(c));
                setCategory(c.id);
                setTertiaryCategories([]);
            } else {
                setCategory("");
                setSubCategories([]);
                setTertiaryCategories([]);
            }
        } else {
            setCategory("");
            setSubCategories([]);
            setTertiaryCategories([]);
        }
    }

    const selectSubCategory = (v: any) => {
        if (v) {
            let c = getSubCategory(v.id);
            if (c) {
                setTertiaryCategories(getSubcategories(c));
                setSubCategory(c.id);
            } else {
                setSubCategory("");
                setTertiaryCategories([]);
            }
        } else {
            setSubCategory("");
            setTertiaryCategories([]);
        }
    }

    const onSelectCategory = (v: any) => {
        selectCategory(v);
    }
    const onSelectSubCategory = (v: any) => {
        setSubCategory(v ? v.id : "");
        selectSubCategory(v);
    }
    const onSelectTertiaryCategory = (v: any) => {
        setTertiaryCategory(v);
    }
    const getAccountableSet = () => {
        return {
            id: "accountable-ds",
            headers: ["Select", "Accountable", "Carbon", "Water", "Waste"].map((v: any, idx: number) => {
                return { id: idx, text: v }
            }),
            rows: getAccountable().map((v: any, idx: number) => {
                return {
                    id: 'r' + idx,
                    cols: [{
                        id: "select-" + idx,
                        text: "Select",
                        type: "checkbox"
                    },
                    {
                        id: 'c' + idx,
                        text: StringUtils.t(v.value)
                    }, {
                        id: "carbon-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: true,
                    }, {
                        id: "water-" + idx,
                        text: "Select",
                        type: "checkbox"
                    }, {
                        id: "waste-" + idx,
                        text: "Select",
                        type: "checkbox"
                    }]
                }
            })
        }
    }

    const ui = () => {
        let accountable = getAccountableSet();
        console.log(accountable);
        return (
            <LayoutPage microApp={inventoryConfigApp} >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {report.companyName}
                        </span>
                        Viridium Industry:   {report.category}
                    </Toast.Header>
                    <Toast.Body>
                        <QuestionniarView />
                        <Row className="v-filters">
                            <Col className="v-summary">
                                <Row>
                                    <Col>Value Chain:</Col>
                                </Row>
                                <Row>
                                    <Form.Group style={{ padding: "1em" }}>
                                        <Form.Check type="checkbox" inline checked={true} label="Company" id="companyOrPartner" />
                                        <Form.Check type="checkbox" inline checked={false} label={"Partners"} id="companyOrPartner" />
                                    </Form.Group>
                                </Row>
                            </Col>
                            <Col className="v-summary">
                                <Row>
                                    <Col>
                                        <DimensionView data={categories} options={{
                                            value: selectedCategory, placeHolder: "Select a category",
                                            label: "Master Categories", onSelectValue: onSelectCategory
                                        }} />
                                    </Col>
                                    <Col>
                                        <DimensionView data={subCategories} options={{
                                            value: selectedSubCategory, placeHolder: "Select a sub category",
                                            label: "Secondary Categories", onSelectValue: onSelectSubCategory
                                        }} />
                                    </Col>
                                    {
                                        tertiaryCategories.length > 0 ?
                                            <Col>
                                                <DimensionView data={tertiaryCategories} options={{
                                                    value: selectedTertiaryCategory, placeHolder: "Select a tertiary category",
                                                    label: "Tertiary Categories", onSelectValue: onSelectTertiaryCategory
                                                }} />
                                            </Col> : ""
                                    }

                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col> &nbsp;</Col>
                        </Row>
                        <Row >
                            <Col>
                                {
                                    selectedCategory !== "" ? <DataTable data={accountable} /> : <div>Please select a category</div>
                                }
                            </Col>
                        </Row>
                        <Action
                            next={{ label: "Next", path: props.next }}
                            prev={{ label: "Back", path: props.prev }} />
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
    return ui();
}