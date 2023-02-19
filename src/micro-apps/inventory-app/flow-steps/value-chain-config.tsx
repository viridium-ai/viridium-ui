import { PureComponent } from "react";
import { Col, Row } from "react-bootstrap";
import { EntityForm, EntityList, FieldDef, ValueType } from "../../../components/v-entity/entity-form";


import { LayoutPage } from "../../../components/v-layout/v-layout";
import { StringUtils } from "../../../components/v-utils/v-string-utils";
import { getValueChainTemplates } from "../../../config/v-config";

import { InventoryItem } from "../../viridium-model";
import { inventoryConfigApp } from "../inventory-app";


export class ValueChainBrowser extends PureComponent<any, { inventories: any, entity: any, subcategories: any }> {
    constructor(props: any) {
        super(props);
        this.state = ({ inventories: [], entity: new InventoryItem(), subcategories: [] });
    }

    fieldDefs = () => {
        let templates = [...getValueChainTemplates()];
        return [
            FieldDef.select("template", (entity: any) => {
                return [{ id: "-1", label: "Please select a template" },
                ...templates.map((v: any) => {
                    return {
                        id: v.name,
                        value: v.name,
                        label: StringUtils.t(v.name)
                    }
                })];
            }).useDefault("-1"),

            FieldDef.select("category", (entity: any) => {
                let template = templates.find((template) => template.name === entity["template"]);
                entity["valueChainTemplate"] = template;
                if (template === undefined) {
                    return [{ id: "-1", label: "Please select a template first" }]
                } else {
                    return [{ id: "-1", label: "Please select a category" },
                    ...template.valueChain.children.map((v: any) => {
                        return {
                            id: v.id,
                            value: v.id,
                            label: v.text
                        }
                    })];
                }
            }).useDefault("-1"),
            FieldDef.select("secondaryCategory", (entity: any) => {
                let categoryId = entity["category"];
                entity["selectedCategory"] = undefined;
                if (categoryId === undefined || categoryId.length === 0) {
                    return [{ id: "-1", label: "Please select a category first" }]
                } else {
                    let taxonomy = entity["valueChainTemplate"].valueChain;
                    let category = taxonomy.children.find((cat: any) => cat.id === categoryId);
                    entity["selectedCategory"] = category;
                    return category ? [{ id: "-1", label: "Please select sub category" },
                    ...category.children.map((v: any) => {
                        return {
                            id: v.id,
                            value: v.id,
                            label: v.text
                        }
                    })] : [{ id: "-1", label: "Please select a category first" }];
                }
            }).useDefault("-1"),

            FieldDef.select("tertiaryCategory", (entity: any) => {
                let category = entity["category"];
                let secondaryCategory = entity["secondaryCategory"];
                entity["tertiaryCategory"] = undefined;
                if (category === undefined || secondaryCategory === undefined) {
                    return [{ id: "-1", label: "Please select a secondary Category first" }]
                } else {
                    let child = entity["selectedCategory"];
                    if (child) {
                        child = child.children.find((cat: any) => cat.id === secondaryCategory);
                        return child ? [{ id: "-1", label: "Please select sub category" },
                        ...child.children.map((v: any) => {
                            return {
                                id: v.id,
                                value: v.text,
                                label: v.text
                            }
                        })] : [{ id: "-1", label: "Please select a secondary Category first" }];
                    }
                }
                return [{ id: "-1", label: "Please select a secondary Category first" }];
            }).useDefault("-1"),

            FieldDef.new("name").isRequired(true),
            FieldDef.new("activity").isRequired(true),
            FieldDef.new("carbon", ValueType.BOOLEAN).useDefault(true),
            FieldDef.new("water", ValueType.BOOLEAN),
            FieldDef.new("waste", ValueType.BOOLEAN)
        ]
    }
    
    onChange = (v: any, entity: any, def:any) => {
        console.log(v, entity);
        if(def.name === "template") {
            entity["selectedCategory"] = undefined;
            entity["valueChainTemplate"]= undefined;
            entity["tertiaryCategory"] = undefined;
            entity["secondaryCategory"] = undefined;
            entity["category"] = undefined;
        }
    }

    onSubmit = (v: any, entity: any) => {
        console.log(v, entity);
    }
    onSelect = (v: any, entity: any) => {

    }
    render = () => {
        return <>
            <EntityForm inline={true} columns={1} fieldDefs={this.fieldDefs} 
                onChange={this.onChange} 
                onSubmit={this.onSubmit} entity={this.state.entity} />
            <div>
                <EntityList fieldDefs={this.fieldDefs} onSelect={this.onSelect} entities={this.state.inventories} title={""} />
            </div>
        </>
    }
}

export class ValueChainConfig extends PureComponent<any, { taxonomy: any, selected: any }> {
    render = () => {
        return <LayoutPage microApp={inventoryConfigApp} >
            <Row>
                <Col>
                    <ValueChainBrowser />
                </Col>
            </Row>
        </LayoutPage>
    }
}
