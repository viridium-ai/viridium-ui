
import { PureComponent, useState } from "react";

import { Toast, Col, Row, Form } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DataTable, DimensionView } from "../../../components/v-table/v-table-1";
import { StringUtils } from "../../../components/v-utils/v-string-utils";

import { getConfigs, getValueChainTemplates, getValueChainAccountable } from "../../../config/v-config";
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

interface ValueChainCategoriesState {
    report: any,
    categories: Array<any>,
    subCategories: Array<any>,
    tertiaryCategories: Array<any>,
    selectedCategory: any,
    selectedSubCategory: any,
    selectedTertiaryCategory: any,
    inventoryList: Array<any>
}
export class ValueChainCategories extends PureComponent<any, ValueChainCategoriesState> {

    taxonomy: any;
    constructor(props: any) {
        super(props);
        let questionnaire = getQuestionnaire();
        let template = getValueChainTemplates().find((template : any) => {
            return template.name === questionnaire.templateName;
        });
        this.taxonomy = template? template.valueChain : getValueChainTemplates()[0];
        let categories = this.taxonomy.children.map((v: any) => {
            return {
                id: v.id,
                value: v.value,
                label: v.text
            }
        });

        this.state = {
            report: questionnaire,
            categories: categories,
            subCategories: [],
            tertiaryCategories: [],
            selectedCategory: undefined,
            selectedSubCategory: undefined,
            selectedTertiaryCategory: undefined,
            inventoryList: questionnaire.inventoryItems
        }
    }

    selectCategory = (v: { id: string, label: string }) => {
        if (v) {
            let c = this.getCategory(v.id);
            if (c) {
                this.setState({
                    subCategories: this.getSubcategories(c),
                    selectedCategory: c.id,
                    tertiaryCategories: []
                })
            } else {
                this.setState({
                    selectedCategory: "",
                    subCategories: [],
                    tertiaryCategories: []
                })
            }
        } else {
            this.setState({
                selectedCategory: "",
                subCategories: [],
                tertiaryCategories: []
            })
        }
    }

    getCategory = (id: string) => {
        return this.taxonomy.children.find((cat: any) => cat.id === id);
    };

    getAccountable = () => {
        let list: Array<any> = [];
        let accountable = getValueChainAccountable();

        this.taxonomy.children.forEach((cat0: any) => {
            cat0.children.forEach((cat1: any) => {
                if (cat1.children && cat1.children.length > 0) {
                    cat1.children.forEach((cat2: any) => {
                        accountable.forEach((a: any) => {
                            list.push({
                                cat0: cat0,
                                cat1: cat1,
                                cat2: cat2,
                                value: a.value
                            });
                        });
                    })
                } else {
                    accountable.forEach((a: any) => {
                        list.push({
                            cat0: cat0,
                            cat1: cat1,
                            value: a.value
                        });
                    });
                }
            })
        });
        return list;
    };

    getSubcategories = (entity: any) => {
        return entity.children.map((v: any) => {
            return {
                id: v.id,
                value: v.id,
                label: v.text
            }
        })
    };

    getSubCategory = (id: string) => {
        let foundCat: any = undefined;
        this.taxonomy.children.forEach((cat: any) => {
            let f = cat.children.find((subcat: any) => subcat.id === id);
            if (f) {
                foundCat = f;
            }
        });
        return foundCat;
    };

    selectSubCategory = (v: { id: string, label: string } | undefined) => {
        if (v) {
            let c = this.getSubCategory(v.id);
            if (c) {
                this.setState({ selectedSubCategory: c.id, tertiaryCategories: this.getSubcategories(c) })
            } else {
                this.setState({ selectedSubCategory: "", tertiaryCategories: [] })
            }
        } else {
            this.setState({ selectedSubCategory: "", tertiaryCategories: [] })
        }
    }

    onSelectCategory = (v: any) => {
        this.selectCategory(v);
        this.setState({ selectedSubCategory: undefined, tertiaryCategories: [] })
    }
    onSelectSubCategory = (v: any) => {
        this.selectSubCategory(v);
        this.setState({ selectedTertiaryCategory: undefined })
    }
    onSelectTertiaryCategory = (v: any) => {
        this.setState({ selectedTertiaryCategory: v.id })
    }

    getAccountableSet = () => {
        let accountable = this.getAccountable();
        const filtered = accountable.filter((row: any) => {
            let inSet = row.cat0.id === this.state.selectedCategory &&
                row.cat1.id === this.state.selectedSubCategory;
            if (this.state.selectedTertiaryCategory) {
                inSet = inSet && row.cat2?.id === this.state.selectedTertiaryCategory;
            }
            return inSet;
        });
        return {
            id: "accountable-ds",
            updatedAt: Date.now(),
            headers: ["Select", "Accountable", "Carbon", "Water", "Waste", "Category",
                "Secondary Category", "Tertiary Category"]
                .map((v: any, idx: number) => {
                    return { id: idx, text: v }
                }),
            rows: filtered.map((v: any, idx: number) => {
                let item = this.state.inventoryList?.find(
                    (item) => item.id === "r" + idx
                        && item.category === this.state.selectedCategory
                        && item.secondaryCategory === this.state.selectedSubCategory
                        && item.tertiaryCategory === this.state.selectedTertiaryCategory
                );
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
                        value: v.value
                    }, {
                        id: "carbon-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: item ? item.carbon : true
                    }, {
                        id: "water-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: item ? item.water : false
                    }, {
                        id: "waste-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: item ? item.waste : false,
                    }, {
                        id: "cat0-" + idx,
                        text: StringUtils.t(v.cat0.value),
                        value: v.cat0.value
                    }, {
                        id: "cat1-" + idx,
                        text: StringUtils.t(v.cat1.value),
                        value: v.cat1.value
                    }, {
                        id: "cat2-" + idx,
                        text: v.cat2 ? StringUtils.t(v.cat2.value) : "",
                        value: v.cat2?.value
                    }]
                }
            })
        }
    }

    updateInventoryList = (list: Array<InventoryItem>) => {
        let q = { ...this.state.report };
        q.inventoryItems = [...list];
        updateQuestionnaire(q);
        this.setState({ inventoryList: list })
    }

    valueChanged = (v: any, row: any, col: any, value: any) => {
        if (col === 0) {
            let list = this.state.inventoryList?.filter((item: any) => item.id !== 'r' + row);
            if (list === undefined) {
                list = new Array<InventoryItem>();
            }
            if (value === true) {
                let invItem = new InventoryItem();
                invItem.id = 'r' + row;
                invItem.activity = v.rows[row].cols[1].value
                invItem.category = this.state.selectedCategory;
                invItem.secondaryCategory = this.state.selectedSubCategory;
                invItem.tertiaryCategory = this.state.selectedTertiaryCategory;
                invItem.water = v.rows[row].cols[3].value;
                invItem.carbon = v.rows[row].cols[2].value;;
                invItem.waste = v.rows[row].cols[4].value;;
                list.push(invItem);
            }
            this.setState({ inventoryList: [...list] });
        } else {
            let list = [...this.state.inventoryList];
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
                this.setState({ inventoryList: [...list] });
            }
        }
    }

    render = () => {
        let accountable = this.getAccountableSet();
        return (
            <LayoutPage microApp={inventoryConfigApp} >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {this.state.report.companyName}
                        </span>
                        Viridium Industry:   {this.state.report.category}
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
                                        <DimensionView data={this.state.categories} options={{
                                            value: this.state.selectedCategory, placeHolder: "Select a category",
                                            label: "Master Categories", onSelectValue: this.onSelectCategory
                                        }} />
                                    </Col>
                                    <Col>
                                        <DimensionView data={this.state.subCategories} options={{
                                            value: this.state.selectedSubCategory, placeHolder: "Select a sub category",
                                            label: "Secondary Categories", onSelectValue: this.onSelectSubCategory
                                        }} />
                                    </Col>
                                    {
                                        this.state.tertiaryCategories.length > 0 ?
                                            <Col>
                                                <DimensionView data={this.state.tertiaryCategories} options={{
                                                    value: this.state.selectedTertiaryCategory, placeHolder: "Select a tertiary category",
                                                    label: "Tertiary Categories", onSelectValue: this.onSelectTertiaryCategory
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
                                    this.state.selectedCategory !== "" ?
                                        <DataTable onDataChanged={this.valueChanged} data={accountable} /> :
                                        <div>Please select a category</div>
                                }
                            </Col>
                        </Row>
                        <Action
                            next={{ label: "Next", path: this.props.next }}
                            prev={{ label: "Back", path: this.props.prev }} />
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
}