import { useState } from "react";

import { Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { Action } from "../../../components/v-wizard";
import { getInventory } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { Inventory } from "./model";

export const MappingCategories = (props: any) => {
    const [inventory] = useState<Inventory>(getInventory());

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp}  >
                    <Toast>
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                Mapping Categories
                            </span>
                            {inventory.company?.name}
                        </Toast.Header>
                        <Toast.Body>
                            {"{{WIP}}"} <p />
                            We need to map raw data categories into Viridium datasets.
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
