import { useState } from "react";
import { Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout";
import { Action } from "../../../components/v-wizard";
import { getInventory } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { Inventory } from "./model";

export const InventorySummary = (props: any) => {
    const [inventory] = useState<Inventory>(getInventory());
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp}  >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            Summary and Review
                        </span>
                        {inventory.company?.name}
                    </Toast.Header>
                    <Toast.Body>
                        {"{{WIP}}"} <p />
                        We need to summary datasets before saving and exporting it via Viridium services
                    </Toast.Body>
                    <Action inventory={inventory}
                        next={{ label: "Next", path: props.next }}
                        prev={{ label: "Back", path: props.prev }} />
                </Toast>
            </LayoutPage >
        )
    }
    return ui();
}
