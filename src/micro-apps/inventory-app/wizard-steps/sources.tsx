import { useState } from "react";

import { Toast, Form, Row, Col } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Action } from "../../../components/wizard";
import { getConfigs } from "../../../config/viridium-config";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, updateQuestionnaire } from "../inventory-common";

export const DataSources = (props: any) => {
    const configs = getConfigs();
    const item = getQuestionnaire();
    const [report, setQuestionnaire] = useState<Questionnaire>(item);

    const ds = configs.dataSources.map((value: string, idx: number) => {
        return { id: "" + (idx + 1), label: value }
    }).filter((value: any) => value !== null);

    const [dataSources, setDataSources] = useState<Array<{ id: string, label: string }>>(ds);

    const onSelectItem = (evt: any) => {
        if (!report.dataSources.includes(evt.target.id)) {
            report.dataSources.push(evt.target.id);
        }
        let clone = { ...report };
        setQuestionnaire(clone);
        updateQuestionnaire(clone);
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
    }

    const ds1 = (): Array<{ id: string, label: string }> => {
        return dataSources.filter((value, idx: number) => {
            return idx < configs.dataSources.length / 2
        });
    };

    const ds2 = (): Array<{ id: string, label: string }> => {
        return dataSources.filter((value, idx: number) => {
            return idx >= configs.dataSources.length / 2
        });
    };

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

                                <Row>
                                    <Col className="v-title">
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
                                    next={{ label: "Next", path: props.next }}
                                    prev={{ label: "Back", path: props.prev}} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }

    return ui();
}