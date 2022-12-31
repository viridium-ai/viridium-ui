import { useState } from "react";

import { Toast, Form, Row, Col } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Action } from "../../../components/wizard";
import { inventoryConfigApp } from "../inventory-app";
import { InventoryItem, getInventoryItem, updateInventoryItem } from "../inventory-common";

export const DataSources = (props: any) => {
    var configs = require('./configs.json');
    const item = getInventoryItem();
    const [report, setInventoryItem] = useState<InventoryItem>(item);
    const [query, setQuery] = useState<string>("");

    const ds = configs.dataSources.map((value: string, idx: number) => {
        return { id: "" + (idx + 1), label: value }
    }).filter((value: any) => value !== null);

    const [datasources, setDataSources] = useState<Array<{ id: string, label: string }>>(ds);

    const onSelectItem = (evt: any) => {
        if (!report.dataSources.includes(evt.target.id)) {
            report.dataSources.push(evt.target.id);
        }
        let clone = { ...report };
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }

    const onSearch = (evt: any) => {
        let key = evt.target.value;
        if (key.trim() === "") {
            setDataSources(ds);
        } else {
            let filteredDSs = ds.filter((ds: any) => {
                return ds.label.toLocaleLowerCase().includes(key.toLocaleLowerCase());
            }
            );
            setDataSources([...filteredDSs]);
        }
        setQuery(key);
    }



    const ds1 = (): Array<{ id: string, label: string }> => {
        return datasources.filter((value, idx: number) => {
            return idx < configs.dataSources.length / 2
        });
    };

    const ds2 = (): Array<{ id: string, label: string }> => {
        return datasources.filter((value, idx: number) => {
            return idx >= configs.dataSources.length / 2
        });
    };

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
                                    <Col className="inventory-title">
                                        <Form.Group controlId="searchDataSource">
                                            <Form.Label>Select Data Sources:</Form.Label>
                                            <Form.Control className="search-box" type="text" onChange={onSearch} placeholder="Search" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="scope-category-box">
                                        <div className="scope-category-content">
                                            {ds1().map((item, idx) => (
                                                <div key={`default-${idx}`} className="mb-2">
                                                    <Form.Check
                                                        onChange={onSelectItem}
                                                        type="checkbox"
                                                        id={item.id}
                                                        label={item.label}
                                                        checked={report.dataSources.includes(item.id)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                    </Col>
                                    <Col className="scope-category-box">
                                        <div className="scope-category-content">{ds2().map((item, idx) => (
                                            <div key={`default-${idx}`} className="mb-2">
                                                <Form.Check
                                                    onChange={onSelectItem}
                                                    type="checkbox"
                                                    id={item.id}
                                                    label={item.label}
                                                    checked={report.dataSources.includes(item.id)}
                                                />
                                            </div>
                                        ))}</div>

                                    </Col>
                                </Row>
                                <Action report={report}
                                    next={{ label: "Next", path: "/inventory-app/questionnairs" }}
                                    prev={{ label: "Back", path: "/inventory-app/items" }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }

    return ui();
}