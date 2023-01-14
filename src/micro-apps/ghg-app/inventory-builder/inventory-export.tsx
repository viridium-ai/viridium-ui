import { useState } from "react";
import { Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { Action } from "../../../components/v-wizard";
import { getCompany, getInventory } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { ConnectorConfig } from "./inventory-items";
import { Inventory } from "./model";
export const InventoryExport = (props: any) => {
    const [inventory] = useState<Inventory>(getInventory());

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} >
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <span className="me-auto">
                                    Export Configuration
                                </span>
                                {getCompany().name}
                            </Toast.Header>
                            <Toast.Body>
                                <ConnectorConfig onReceiveData={(data: any) => { console.log(data) }} />
                            </Toast.Body>
                            <Action inventory={inventory} prev={{ label: "Back", path: props.prev }} />
                        </Toast>
            </LayoutPage >
        )
    }
    return ui();
}