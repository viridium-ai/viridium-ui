import { useState } from "react";

import { Question, Action } from "../../../components/wizard";
import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { greenHouseApp } from "../ghg-app";
import { AggregatedEmission, AnalyticTable, OrganizationForm } from "../ghg-common";


export const Analytics = (props: any) => {
    const [calculationApproach, setApproach] = useState("3");
    const onSelect = (evt: any) => {
        setApproach(evt.target.value);
    }
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Analytics</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Question label="Organizational Boundaries" id="org">
                                    <OrganizationForm />
                                </Question>
                                <Question label="Emission by source type" id="org">
                                    <AnalyticTable title="Emission by source type" headers={["Type", "Emission"]}>
                                        <AggregatedEmission dimensions={["Direct Emissions from Stationary Combustion"]} measure="123" />
                                    </AnalyticTable>
                                </Question>
                                <Question label="Emission by facility" id="org">
                                    <AnalyticTable title="Emission by facility (Scope 1)" headers={["Type", "Emission"]}>
                                        <AggregatedEmission dimensions={["Warehouse"]} measure="12" />
                                    </AnalyticTable>
                                </Question>
                                <Question label="Emission by country" id="org">
                                    <AnalyticTable title="Emission by country" headers={["Type", "Emission"]}>
                                        <AggregatedEmission dimensions={["USA"]} measure="90" />
                                    </AnalyticTable>
                                </Question>
                                <Question label="Calculation Approach" id="approach">
                                    <Form.Select onChange={onSelect} value={calculationApproach} aria-label="Default Approach">
                                        <option>Select a type</option>
                                        <option value="1">Direct Measurement</option>
                                        <option value="2">Stoichiometric Calculation</option>
                                        <option value="3">Estimate Emissions</option>
                                    </Form.Select>
                                </Question>
                                <Action next={{ label: "Next", path: "/wizard/5" }} prev={{ label: "Back", path: "/wizard/3" }} />

                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="wizard-body-help">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Optional Information and Metrics</strong>
                            </Toast.Header>
                            <Toast.Body>

                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}