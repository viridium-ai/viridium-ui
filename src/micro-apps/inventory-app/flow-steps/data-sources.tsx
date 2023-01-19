import { useState } from "react";

import { Toast, Form, Row, Col } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { Action } from "../../../components/v-wizard";
import { getConfigs } from "../../../config/v-config";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, updateQuestionnaire } from "../inventory-questionaire";
import { QuestionniarView } from "./value-chain-categories";

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
            <LayoutPage microApp={inventoryConfigApp}  >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {report.companyName}
                        </span>
                        Viridium Industry:   {report.category}
                    </Toast.Header>
                    <Toast.Body>
                    <QuestionniarView />
                        <Row>
                            <Col sm={6} className="v-title">
                                <Form.Group controlId="searchDataSource">
                                    <Form.Label>Select Data Sources:</Form.Label>
                                    <Form.Control className="v-search-box" type="text"
                                        onChange={onSearch} placeholder="Search" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="v-panel">
                                <div className="v-panel-content">
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
                            <Col className="v-panel">
                                <div className="v-panel-content">{ds2().map((item, idx) => (
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
                            prev={{ label: "Back", path: props.prev }} />
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }

    return ui();
}