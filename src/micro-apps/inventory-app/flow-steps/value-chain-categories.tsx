
import { useState } from "react";

import { Toast, Col, Row, Form } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DataTable, DimensionView } from "../../../components/v-table/v-table-1";
import { StringUtils } from "../../../components/v-utils/v-string-utils";

import { getConfigs, getTreeData, getValueChainConfigs } from "../../../config/v-config";
import { InventoryItem } from "../../viridium-model";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, updateQuestionnaire } from "../inventory-questionaire";

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
                                    {/* <Form.Group style={{ padding: "1em" }}>
                                        <Form.Check type="checkbox" inline checked={true} label="Company" id="companyOrPartner" />
                                        <Form.Check type="checkbox" inline checked={false} label={"Partners"} id="companyOrPartner" />
                                    </Form.Group> */}
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
    let list : Array<any> = [];
    let accountable = getValueChainConfigs()["accountable"];

    taxonomy.children.forEach((cat0 : any) => {
        cat0.children.forEach((cat1 : any) => {
            if(cat1.children && cat1.children.length > 0) {
                cat1.children.forEach((cat2:any)=> {
                    accountable.forEach((a:any) => {
                        list.push({
                            cat0:cat0,
                            cat1:cat1,
                            cat2:cat2, 
                            value: a.value
                        });
                    });
                })
            } else {
                accountable.forEach((a:any) => {
                    list.push({
                        cat0:cat0,
                        cat1:cat1,
                        value: a.value
                    });
                });
            }
        })
    } );

    console.log(list, taxonomy);
    return list;   
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
    let questionaire = getQuestionnaire();
    const [report] = useState<Questionnaire>(getQuestionnaire());
    const [subCategories, setSubCategories] = useState<Array<{ id: string, label: string }>>([]);
    const [tertiaryCategories, setTertiaryCategories] = useState<Array<{ id: string, label: string }>>([]);
    const [selectedCategory, setCategory] = useState("");
    const [selectedSubCategory, setSubCategory] = useState("");
    const [selectedTertiaryCategory, setTertiaryCategory] = useState("");
    const [inventoryList, setInventoryList] = useState(questionaire.inventoryItems);
    const selectCategory = (v: {id:string, label:string}) => {
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

    const selectSubCategory = (v: {id:string, label:string} | undefined) => {
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
        selectSubCategory(undefined);
        setTertiaryCategory("");
    }
    const onSelectSubCategory = (v: any) => {
        selectSubCategory(v);
        setTertiaryCategory("");
    }
    const onSelectTertiaryCategory = (v: any) => {
        setTertiaryCategory(v.id);
    }

    const getAccountableSet = () => {
        let accountable = getAccountable();
        console.log(accountable, selectedCategory);
        const filtered = accountable.filter((row: any) => {
            let inSet = row.cat0.id === selectedCategory &&
                row.cat1.id === selectedSubCategory;
            if (selectedTertiaryCategory) {
                inSet = inSet && row.cat2?.id === selectedTertiaryCategory;
            }
            return inSet;
        });
        
        return {
            id: "accountable-ds",
            headers: ["Select", "Accountable", "Carbon", "Water", "Waste", "Category",
                     "Secondary Category", "Ternitary Category"]
                .map((v: any, idx: number) => {
                    return { id: idx, text: v }
                }),
            rows: filtered.map((v: any, idx: number) => {
                let item = inventoryList?.find((item)=>item.id === "r" + idx);
                return {
                    id: 'r' + idx,
                    cols: [{
                        id: "select-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: item !== undefined,
                    },
                    {
                        id: 'c' + idx,
                        text: StringUtils.t(v.value),
                        value:v.value
                    }, {
                        id: "carbon-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: item?item.carbon:true
                    }, {
                        id: "water-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: item?item.water:false
                    }, {
                        id: "waste-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: item?item.waste:false,
                    }, {
                        id: "cat0-" + idx,
                        text: StringUtils.t(v.cat0.value),
                        value:v.cat0.value
                    }, {
                        id: "cat1-" + idx,
                        text: StringUtils.t(v.cat1.value),
                        value:v.cat1.value
                    }, {
                        id: "cat2-" + idx,
                        text: v.cat2 ? StringUtils.t(v.cat2.value) : "",
                        value:v.cat2?.value
                    }]
                }
            })
        }
    }

    const updateInventoryList = (list : Array<InventoryItem>) => {
        let q = {...questionaire};
        q.inventoryItems = [...list];
        updateQuestionnaire(q);
        setInventoryList(list);
    }

    const valueChanged = (v: any, row: any, col: any, value: any) => {
        if (col === 0) {
            let list = inventoryList?.filter((item: any) => item.id !== 'r' + row);
            if (list === undefined) {
                list = new Array<InventoryItem>();
            }
            if (value === true) {
                let invItem = new InventoryItem();
                invItem.id = 'r' + row;
                invItem.activity =  v.rows[row].cols[1].value
                invItem.category = selectedCategory;
                invItem.secondaryCategory = selectedSubCategory;
                invItem.tertiaryCategory = selectedTertiaryCategory;
                invItem.water = v.rows[row].cols[3].value;
                invItem.carbon = v.rows[row].cols[2].value;;
                invItem.waste = v.rows[row].cols[4].value;;
                list.push(invItem);
            }
            updateInventoryList([...list]);
        } else {
            let list = [...inventoryList];
            let item = list.find((item: any) => item.id === 'r' + row);
            if (item !== undefined) {
                switch (col) {
                    case 2:
                        item.carbon = value;
                        break;
                    case 3:
                        item.water = value;
                        break;
                    case 4:
                        item.waste = value;
                        break;
                }
                updateInventoryList(list);
            }
        }
    }

    const ui = () => {
        let accountable = getAccountableSet();

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
                            <Col sm={6} className="v-summary">
                                <Row>
                                    <Col>Value Chain Impact:</Col>
                                </Row>
                            </Col>
                            <Col sm={6} className="v-summary">
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
                                    selectedCategory !== "" ? 
                                        <DataTable onDataChanged={valueChanged} data={accountable} /> : 
                                        <div>Please select a category</div>
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