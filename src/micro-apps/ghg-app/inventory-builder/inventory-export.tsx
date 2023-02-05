import { useState } from "react";
import { Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { Action } from "../../../components/wizard";

import { getCompany } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { ConnectorConfig } from "./inventory-items";
import { Company } from "./model";
export const InventoryExport = (props: any) => {
    const [company] = useState<Company>(getCompany());

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} >
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <span className="me-auto">
                                    Export Configuration
                                </span>
                                {company.name}
                            </Toast.Header>
                            <Toast.Body>
                                <ConnectorConfig direction="Outbound" onProcessData={(data: any) => { console.log(data) }} />
                            </Toast.Body>
                            <Action inventory={company.inventory} prev={{ label: "Back", path: props.prev }} />
                        </Toast>
            </LayoutPage >
        )
    }
    return ui();
}