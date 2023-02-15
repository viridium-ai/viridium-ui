import { useState } from "react";
import { Col, Row, Toast } from "react-bootstrap";
import { EntityList } from "../../../components/v-entity/entity-form";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DataTable } from "../../../components/v-table/v-table-1";
import { StringUtils } from "../../../components/v-utils/v-string-utils";
import { getCompany } from "../../../config/v-config";
import { InventoryItem } from "../../viridium-model";
import { greenHouseApp } from "../ghg-app";

import { ImMagicWand } from "react-icons/im";
import { FiHelpCircle } from "react-icons/fi";
import { Alert } from "../../../components/v-alert/alert";

export const MappingCategories = (props: any) => {
    const rawData = require("../../../config/us-sc-factors.json");
    let c = getCompany();
    if (c && c.inventory === undefined) {
        c.inventory = c.inventories![0];
    }
    const [items] = useState(c?.inventory?.items);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | undefined>();
    const [selectedFactor, setSelectedFactor] = useState<any | undefined>();
    const [showAlert, setShowAlert] = useState(
        {
            title: "No title", message: "No message", ttl: 10000, show: false
        }
    );
    const [filters, setFilters] = useState([
        { name: "Name", value: "raw" },
        {
            name: "Year", value: "2011", options: [
                "", "2010", "2011", "2012", "2013", "2014", "2015", "2016"
            ].map((y) => {
                return { name: y, label: y.length === 0 ? "All Years" : y, value: y }
            })
        },
        {
            name: "Type", value: "Commodity", options: [
                "", "Commodity", "Industry"
            ].map((y) => {
                return { name: y, label: y.length === 0 ? "All Types" : y, value: y }
            })
        }]);

    const factors = {
        headers: rawData.headers.slice(0, 8),
        rows: rawData.rows.map((row: any) => {
            return {
                id: row.id,
                cols: row.cols.slice(0, 8)
            }
        })
    }

    const handleSelect = (rowId: string, row: any) => {
        setSelectedFactor(row);
    }

    const onSelectInventoryItem = (evt: any, data: any) => {
        let filters = [{ name: "Name", value: evt.category },
        {
            name: "Year", value: "2011", options: [
                "", "2010", "2011", "2012", "2013", "2014", "2015", "2016"
            ].map((y) => {
                return { name: y, label: y.length === 0 ? "All Years" : y, value: y }
            })
        },
        {
            name: "Type", value: "Commodity", options: [
                "", "Commodity", "Industry"
            ].map((y) => {
                return { name: y, label: y.length === 0 ? "All Types" : y, value: y }
            })
        }];
        setFilters(filters);
        setSelectedItem(evt);
    }
    const onMagic = () => {
        let alertMsg = {
            title: "Info",
            message: "Magic wand is malfunctioning right now",
            show: true,
            ttl: 10000
        }
        setShowAlert(alertMsg);        
    }

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp}  >
                <Toast>
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            From inventory to factors
                        </span>
                        <span className="v-icon-button" onClick={onMagic}><ImMagicWand /></span>
                        <span className="v-icon-button" onClick={onMagic}><FiHelpCircle /></span>
                    </Toast.Header>
                    <Toast.Body >
                        <Row>
                            <Col sm={4}>
                                {
                                    items && items.length > 0 ? <EntityList fieldDefs=
                                        {
                                            () => {
                                                return InventoryItem.fieldDefs().filter((filter: any) =>
                                                    ["category", "activity", "quantity"].includes(filter.name))
                                            }
                                        }
                                        entities={items} title={"Inventory Items"}
                                        onSelect={onSelectInventoryItem} /> : ""
                                }
                            </Col>
                            <Col sm={8}>
                                <div className="v-panel">
                                    {
                                        selectedItem === undefined ?
                                            <div className="v-hint"> Please select an inventory item on the left, and then find a factor that is applicable
                                                from the table below
                                            </div> :
                                            <Row className="v-data">
                                                <Col>Inventory Item</Col>
                                                <Col> {StringUtils.t(selectedItem.category)}</Col>
                                                <Col> {StringUtils.t(selectedItem.activity)}</Col>
                                                <Col> {selectedItem.quantity}</Col>
                                                <Col> {selectedItem.uom}</Col>
                                            </Row>
                                    }
                                    {
                                        selectedFactor ?
                                            <Row className="v-data">
                                                <Col>Factor</Col>
                                                <Col> {selectedFactor.cols[2].text}</Col>
                                                <Col> {selectedFactor.cols[6].text}</Col>
                                                <Col></Col>
                                                <Col> {selectedFactor.cols[7].text}</Col>
                                            </Row> : ""
                                    }
                                    {
                                        selectedFactor && selectedItem ?
                                            <Row className="v-metrics">
                                                <Col>Emission</Col>
                                                <Col> CO<sub>2</sub> </Col>
                                                <Col></Col>
                                                <Col> {new Intl.NumberFormat().format(Math.random() * 10000)}</Col>
                                                <Col> Tonne</Col>

                                            </Row> : ""
                                    }
                                </div>
                                <div className="big-table">
                                    <DataTable columns={["Name", "Substance", "Factor"]}
                                        filters={filters}
                                        data={factors} onSelectRow={handleSelect} />
                                </div>

                            </Col>
                        </Row>
                    </Toast.Body>
                    <Action
                        next={{ label: "Next", path: props.next }}
                        prev={{ label: "Back", path: props.prev }} />
                </Toast>
                <Alert title={showAlert.title} ttl={showAlert.ttl} text={showAlert.message} show={showAlert.show} />
            </LayoutPage >
        )
    }
    return ui();
}
