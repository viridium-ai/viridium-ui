import { useState } from "react";
import { Toast } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { getCompany } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { Company } from "../../viridium-model";

export const InventorySummary = (props: any) => {
    const [company] = useState<Company|undefined>(getCompany());
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp}  >
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                Summary and Review
                            </span>
                            {company?.name}
                        </Toast.Header>
                        <Toast.Body>
                            {"{{WIP}}"} <p />
                            We need to summary datasets before saving and exporting it via Viridium services
                        </Toast.Body>
                        <Action 
                            next={{ label: "Next", path: props.next }}
                            prev={{ label: "Back", path: props.prev }} />
                    </Toast>
            </LayoutPage >
        )
    }
    return ui();
}
