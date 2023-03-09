import { PureComponent, useState } from "react";

import { Toast, Col, Row, Form, Table } from "react-bootstrap";
import { Action } from "components/v-flow/wizard";
import { LayoutPage } from "components/v-layout/v-layout";
import { DataTable, DimensionView } from "components/v-table/v-table-1";
import { StringUtils } from "components/v-utils/v-string-utils";

import { getValueChainTemplates, getValueChainAccountable } from "config/v-config";
import { InventoryItem } from "../../viridium-model";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, updateQuestionnaire } from "../inventory-questionnaire";

export const QuestionnaireView = (props: any) => {
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
interface AccountableState {
    report: any
}
interface AccountableProps {
    data: any,
    valueChanged: Function,
    onAction: Function
}
export class Accountable extends PureComponent<AccountableProps, AccountableState> {

    constructor(props: AccountableProps) {
        super(props);
        this.state = { report: props.data }
    }

    render = () => (
        <div className="v-accountable">
            <div className="v-flex"><div>
                Select:
            </div>
                <div className="v-button v-flex-end" id="v-select-rec" onClick={
                    () => {
                        this.props.onAction("recommended");
                    }
                }
                > Recommended</div>
                <div className="v-button v-flex-end" id="v-select-all" onClick={
                    () => {
                        this.props.onAction("all");
                    }
                }
                >  All</div>

                <div className="v-button v-flex-end" id="v-select-clear" onClick={
                    () => {
                        this.props.onAction("clear");
                    }
                }
                > Clear </div>
            </div>
            <DataTable onDataChanged={this.props.valueChanged} data={this.props.data} />
        </div>
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
    inventoryList: Array<InventoryItem>
}
export class ValueChainCategories extends PureComponent<any, ValueChainCategoriesState> {
    taxonomy: any;
    constructor(props: any) {
        super(props);
        let questionnaire = getQuestionnaire();
        let template = getValueChainTemplates().find((template: any) => {
            return template.name === questionnaire.templateName;
        });
        this.taxonomy = template ? template.valueChain : getValueChainTemplates()[0];
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
        let accountable = getValueChainAccountable();
        return accountable;
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
        this.setState({ selectedSubCategory: undefined, tertiaryCategories: [], selectedTertiaryCategory: undefined })
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
        return {
            id: "accountable-ds",
            updatedAt: Date.now(),
            headers: ["Select", "Accountable", "Carbon", "Water", "Waste"]
                .map((v: any, idx: number) => {
                    return { id: idx, text: v }
                }),
            rows: accountable.map((v: any, idx: number) => {
                let item = this.state.inventoryList?.find(
                    (item) => item.activity === v.value
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

    isRecommended = (row: any, idx: number) => {
        return idx % 2 === 0;
    }

    onAction = (action: "clear" | "all" | "recommended") => {
        if (action === "clear") {
            const list = [...this.state.inventoryList].filter((item) => {
                let matchCategories = item.category === this.state.selectedCategory
                    && item.secondaryCategory === this.state.selectedSubCategory
                    && item.tertiaryCategory === this.state.selectedTertiaryCategory;
                return !matchCategories;
            });
            this.updateInventoryList(list);
        }
        if (action === "all") {
            const onTheList = [...this.state.inventoryList].filter((item) => {
                let matchCategories = item.category === this.state.selectedCategory
                    && item.secondaryCategory === this.state.selectedSubCategory
                    && item.tertiaryCategory === this.state.selectedTertiaryCategory;
                return !matchCategories;
            });

            this.getAccountableSet().rows.forEach((row: any, idx: number) =>
                onTheList.push(this.newItem(row, idx))
            );
            this.updateInventoryList(onTheList);
        }
        if (action === "recommended") {
            const onTheList = [...this.state.inventoryList].filter((item) => {
                let matchCategories = item.category === this.state.selectedCategory
                    && item.secondaryCategory === this.state.selectedSubCategory
                    && item.tertiaryCategory === this.state.selectedTertiaryCategory;
                return !matchCategories;
            });

            this.getAccountableSet().rows.forEach((row: any, idx: number) => {
                if ([2, 5, 6].includes(idx)) {
                    onTheList.push(this.newItem(row, idx))
                }
            }
            );
            this.updateInventoryList(onTheList);
        }
    }

    newItem = (row: any, idx: number) => {
        let invItem = new InventoryItem();
        invItem.id = 'r' + row.cols[1].value;
        invItem.activity = row.cols[1].value;
        invItem.category = this.state.selectedCategory;
        invItem.secondaryCategory = this.state.selectedSubCategory;
        invItem.tertiaryCategory = this.state.selectedTertiaryCategory;
        invItem.water = row.cols[3].value;
        invItem.carbon = row.cols[2].value;
        invItem.waste = row.cols[4].value;
        return invItem;
    }

    valueChanged = (v: any, row: any, col: any, checked: any) => {
        let selectedRow = v.rows[row];
        let selectedValue = selectedRow.cols[1].value;
        if (col === 0) {
            let list = [...this.state.inventoryList].filter((item) => {
                let matchCategories = item.id === 'r' + selectedValue
                    && item.category === this.state.selectedCategory
                    && item.secondaryCategory === this.state.selectedSubCategory
                    && item.tertiaryCategory === this.state.selectedTertiaryCategory;
                return !matchCategories;
            });
            if (list === undefined) {
                list = new Array<InventoryItem>();
            }
            if (checked === true) {
                list.push(this.newItem(v.rows[row], row));
            }
            this.updateInventoryList(list);
        } else {
            let list = [...this.state.inventoryList];
            let item = list.find((item: any) => item.id === 'r' + selectedValue);
            if (item !== undefined) {
                switch (col) {
                    case 2:
                        item.carbon = checked;
                        break;
                    case 3:
                        item.water = checked;
                        break;
                    case 4:
                        item.waste = checked;
                        break;
                }
                this.updateInventoryList(list);
            }
        }
    }
    renderAccountable = () => {
        let accountable = this.getAccountableSet();
        return <div className="v-accountable">
            <div className="v-flex"><div>
                Select:
            </div>
                <div className="v-button v-flex-end" id="v-select-rec" onClick={
                    () => {
                        this.onAction("recommended");
                    }
                }
                > Recommended</div>
                <div className="v-button v-flex-end" id="v-select-all" onClick={
                    () => {
                        this.onAction("all");
                    }
                }
                >  All</div>

                <div className="v-button v-flex-end" id="v-select-clear" onClick={
                    () => {
                        this.onAction("clear");
                    }
                }
                > Clear </div>
            </div>
            <DataTable onDataChanged={this.valueChanged} data={accountable} />
        </div>
    }
    render = () => {
        let showAccountable = this.state.selectedCategory && this.state.selectedCategory !== "";
        return (
            <LayoutPage microApp={inventoryConfigApp} >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {this.state.report.companyName}
                        </span>
                        Template:   {StringUtils.t(this.state.report.templateName)}
                    </Toast.Header>
                    <Toast.Body>
                        <QuestionnaireView />
                        <Row className="v-filters">
                            <Col sm={6} className="v-summary">
                                <Row>
                                    <Col>Value Chain Impact:</Col>
                                    <Col>{this.state.inventoryList.length}</Col>
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
                            <Col sm={6}>
                                <h3>Selected inventory</h3>
                                <div className="v-table-container">
                                    <Table >
                                        <thead><tr>
                                            <th >Accountable</th>
                                            <th >Category</th>
                                            <th >{StringUtils.t("secondaryCategory")}</th>
                                            <th >{StringUtils.t("tertiaryCategory")}</th>
                                        </tr></thead>
                                        <tbody>
                                            {this.state.inventoryList.map((item, idx) => {
                                                return <tr key={"tr-" + idx}>
                                                    <td >{StringUtils.t(item.activity)}</td>
                                                    <td >{StringUtils.t(item.category)}</td>
                                                    <td >{StringUtils.t(item.secondaryCategory)}</td>
                                                    <td >{StringUtils.t(item.tertiaryCategory)}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col sm={6}>
                                {
                                    showAccountable ? this.renderAccountable() : <div>Please select a category</div>
                                }
                            </Col>
                        </Row>
                        <div className="v-footer v-flex">
                            <Action
                                next={{ label: "Next", path: this.props.next }}
                                prev={{ label: "Back", path: this.props.prev }} />
                        </div>
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
}