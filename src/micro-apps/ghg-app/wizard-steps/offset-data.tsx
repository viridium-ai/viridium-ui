
import { Question, Action } from "../../../components/wizard";
import { Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { greenHouseApp } from "../ghg-app";
import { AnalyticTable, AggregatedEmission } from "../ghg-common";



export const OffsetData = (props: any) => {

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Offset Information</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Question label="Information on offsets that have been purchased or developed outside the inventory boundary" id="org">
                                    <AnalyticTable title="Emission by country" headers={["Project Type", "Location", "Quantity"]}>
                                        <AggregatedEmission dimensions={["Fuel", "USA"]} measure="90" />
                                    </AnalyticTable>
                                </Question>
                                <Question label="Information on reductions inside the inventory boundary that have been sold/transferred as offsets to a third party" id="org">
                                    <AnalyticTable title="Emission by country" headers={["Project Type", "Location", "Quantity"]}>
                                        <AggregatedEmission dimensions={["Test", "California"]} measure="190" />
                                        <AggregatedEmission dimensions={["Test", "China"]} measure="90" />
                                    </AnalyticTable>
                                </Question>
                                <Action prev={{ label: "Back", path: "/wizard/4" }} next={{ label: "Done", path: "/wizard/submit" }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="wizard-body-help">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Offset</strong>
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