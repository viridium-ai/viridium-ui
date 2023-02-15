import { PureComponent, useState } from "react";

import { Toast, Col, Row } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DataTable, DimensionView } from "../../../components/v-table/v-table-1";
import TreeView from "../../../components/v-tree-view/v-tree-view";
import { StringUtils } from "../../../components/v-utils/v-string-utils";

import { getConfigs, getValueChainConfigs } from "../../../config/v-config";
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


export class ValueChainConfig extends PureComponent<any, { valueChainTaxonomy: any }> {
    constructor(props: any) {
        super(props);
        this.state = ({ valueChainTaxonomy: getValueChainConfigs() });
    }
    getTreeData = () => {
        let valueChain = this.state.valueChainTaxonomy;
        return this.toTreeNode(valueChain);
    }

    toTreeNode = (taxonomyNode: any) => {
        return {
            id: taxonomyNode["name"],
            text: StringUtils.t(taxonomyNode["name"]),
            as: "list",
            children: taxonomyNode["children"].map((node: any) => {
                return this.toTreeNode(node)
            })
        }
    }

    render = () => {
        return <LayoutPage microApp={inventoryConfigApp} >
            <TreeView data={this.getTreeData()} />
        </LayoutPage>
    }

}

export const ValueChainCategories = (props: any) => {
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
                    }, ...[v[2], v[3], v[4]].map((c: any, jdx: number) => {
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
                        <Row className="v-filters">
                            <Col className="v-summary">Value Chain:
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