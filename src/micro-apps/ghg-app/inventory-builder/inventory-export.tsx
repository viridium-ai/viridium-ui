import { useState } from "react";
import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Action } from "../../../components/wizard";
import { getCompany, getInventory } from "../../../config/viridium-config";
import { greenHouseApp } from "../ghg-app";
import { ConnectorConfig } from "./inventory-items";
import { Inventory } from "./model";
export const InventoryExport = (props: any) => {
    const [inventory, setInventory] = useState<Inventory>(getInventory());
    const onSelectContext = (evt: any) => {
        let clone = { ...inventory };
        clone.context = evt.target.value;
        setInventory(clone);
    }
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                <div className="v-body">
                    <div className="v-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <span className="me-auto">
                                    Export Metrics
                                </span>
                                {getCompany().name}
                            </Toast.Header>
                            <Toast.Body>
                                <ConnectorConfig onReceiveData={(data: any) => { console.log(data) }} />
                                <Action inventory={inventory} prev={{ label: "Back", path: props.prev }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}