import { PureComponent } from "react";

import { Toast, Form, Row, Col } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";

import { getConfigs } from "../../../config/v-config";
import { inventoryConfigApp } from "../inventory-app";
import { getQuestionnaire, updateQuestionnaire } from "../inventory-questionnaire";
import { QuestionnaireView } from "./value-chain-categories";

export class InventoryCategories extends PureComponent<any, { report: any, toggleAll: boolean }>{
    constructor(props: any) {
        super(props);
        this.state = {
            report: getQuestionnaire(), toggleAll: false
        }
    }
    onSelectScope1 = (evt: any) => {
        let clone = { ...this.state.report };
        if (!clone.scope1Needs.includes(evt.target.id)) {
            clone.scope1Needs.push(evt.target.id);
        }
        this.setState({ report: clone });
        updateQuestionnaire(clone);
    }

    onSelectScope3 = (evt: any) => {
        let clone = { ...this.state.report };
        if (!clone.scope3Needs.includes(evt.target.id)) {
            clone.scope3Needs.push(evt.target.id);
        }
        this.setState({ report: clone });
        updateQuestionnaire(clone);
    }

    scope1Category = (): Array<{ id: string, label: string }> => {
        return getConfigs().categories.scope1.map((value: string, idx: number) => {
            return { id: value, label: value }
        })
    };

    scope3Category = (): Array<{ id: string, label: string }> => {
        return getConfigs().categories.scope3.map((value: string, idx: number) => {
            return { id: value, label: value }
        })
    };

    toggleAll = (evt: any) => {
        let clone = { ...this.state.report };
        if (evt.target.checked) {
            clone.scope1Needs = getConfigs().categories.scope1.map((value: string, idx: number) => {
                return value
            })
            clone.scope3Needs = getConfigs().categories.scope3.map((value: string, idx: number) => {
                return value
            });
        } else {
            clone.scope1Needs = [];
            clone.scope3Needs = [];
        }

        this.setState({ report: clone, toggleAll: evt.target.checked });
        updateQuestionnaire(clone);
    }

    render = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp}  >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {this.state.report.companyName}
                        </span>
                        Viridium Industry:   {this.state.report.category}
                    </Toast.Header>
                    <Toast.Body>
                        <QuestionnaireView />
                        <Row>
                            <Col className="v-title" style={{ display: "flex" }}>
                                <span className="me-auto">
                                    Select Data Source Based on your knowledge of the Account
                                </span>
                                <span>
                                    <Form.Check onChange={this.toggleAll}
                                        type="checkbox"
                                        id="check-all-boxes"
                                        label={"Toggle All"}
                                        checked={this.state.toggleAll}
                                    />
                                </span>

                            </Col>
                        </Row>
                        <Row>
                            <Col className="v-panel">
                                <div className="v-panel-header">Scope 1/2 Needs</div>
                                <div className="v-panel-content">
                                    {this.scope1Category().map((item, idx) => {
                                        return (
                                            <div key={`default-${idx}`} className="mb-2">
                                                <Form.Check
                                                    onChange={this.onSelectScope1}
                                                    type="checkbox"
                                                    id={item.id}
                                                    label={item.label}
                                                    checked={this.state.report.scope1Needs.includes(item.id)}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </Col>
                            <Col className="v-panel">
                                <div className="v-panel-header">Scope 3 Needs</div>
                                <div className="v-panel-content">{this.scope3Category().map((item, idx) => (
                                    <div key={`default-${idx}`} className="mb-2">
                                        <Form.Check
                                            onChange={this.onSelectScope3}
                                            type="checkbox"
                                            id={item.id}
                                            label={item.label}
                                            checked={this.state.report.scope3Needs.includes(item.id)}
                                        />
                                    </div>
                                ))}</div>
                            </Col>
                        </Row>
                        <div className="v-footer v-flex">
                            <Action report={this.state.report}
                                next={{ label: "Next", path: this.props.next }}
                                prev={{ label: "Back", path: this.props.prev }} />
                        </div>
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
}