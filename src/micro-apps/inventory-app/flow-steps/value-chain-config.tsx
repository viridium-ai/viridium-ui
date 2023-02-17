import { PureComponent } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { EntityForm, EntityList } from "../../../components/v-entity/entity-form";


import { LayoutPage } from "../../../components/v-layout/v-layout";

import { getTreeData } from "../../../config/v-config";
import { InventoryItem } from "../../viridium-model";
import { inventoryConfigApp } from "../inventory-app";


export class ValueChainBrowser extends PureComponent<any, { inventories: any, entity: any, subcategories: any }> {
    constructor(props: any) {
        super(props);
        this.state = ({ inventories: [], entity: new InventoryItem(), subcategories: [] });
    }
    onSubmit = (v: any, entity: any) => {
        console.log(v, entity);
    }
    onSelect = (v: any, entity: any) => {

    }
    render = () => {
        return <>
            <EntityForm inline={true} columns={1} fieldDefs={InventoryItem.fieldDefs2} onSubmit={this.onSubmit} entity={this.state.entity} />
            <div>
                <EntityList fieldDefs={InventoryItem.fieldDefs2} onSelect={this.onSelect} entities={this.state.inventories} title={""} />
            </div>

        </>
    }
}

export class ValueChainBrowser2 extends PureComponent<any, { taxonomy: any, selected: any, subcategories: any }> {
    constructor(props: any) {
        super(props);
        this.state = ({ taxonomy: getTreeData(), selected: undefined, subcategories: [] });
    }

    selectCategory = (evt: any) => {
        console.log(evt.target.value);
        let tax = this.state.taxonomy.children.find((cat: any) => cat.id === evt.target.value);
        this.setState({ subcategories: tax.children });
    }
    selectSubCategory = (v: any) => {

    }
    render = () => {
        return <div className="v-select-container">
            <Col><Form.Select className="v-select" onChange={this.selectCategory} >
                <option key={'o-1'} value={""}>Please select a category</option>
                {
                    this.state.taxonomy["children"].map((o: any, idx: number) => {
                        return <option key={'o' + idx} value={o.id}>{o.text}</option>
                    })
                }
            </Form.Select>
            </Col>
            <Col> <Form.Select className="v-select" style={{ display: "inline-block" }} onChange={this.selectSubCategory} > {
                this.state.subcategories.length === 0 ? <option key={'o-1'} value={""}>Please select a category first</option>
                    : <option key={'o-1'} value={""}>Please select a sub category</option>
            }{
                    this.state.subcategories.map((o: any, idx: number) => {
                        return <option key={'o' + idx} value={o.id}>{o.text}</option>
                    })
                } </Form.Select>
            </Col>
        </div>
    }
}

export class ValueChainConfig extends PureComponent<any, { taxonomy: any, selected: any }> {
    constructor(props: any) {
        super(props);
        let data = getTreeData();
        this.state = ({ taxonomy: data, selected: undefined });
    }

    onSelect = (v: any, node: any) => {
        this.setState({ selected: node });
        console.log(node);
    }

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
