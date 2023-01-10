import { useState } from "react";
import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Question, Action } from "../../../components/wizard";
import { getConfigs } from "../../../config/viridium-config";
import { inventoryConfigApp } from "../../inventory-app/inventory-app";
import { Inventory } from "./model";
export const InventoryExport = (props: any) => {
    const configs = getConfigs();
    const [inventory, setInventory] = useState<Inventory>(props.inventory);
    const onSelectContext = (evt: any) => {
        let clone = { ...inventory };
        clone.context = evt.target.value;
        setInventory(clone);
    }

    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                Export Inventory
                            </span>
                            {inventory.company.name}
                            </Toast.Header>
                            <Toast.Body>
                                <Question label="Export To">
                                    <Form.Select value={inventory.context} onChange={onSelectContext} aria-label="">
                                        <option>Select a Destination</option>
                                        {
                                            [{ id: "AzuerPowerBI", label: "Azure Power BI" },
                                            { id: "Snowflake", label: "Snowflake" },
                                            { id: "sap", label: "SAP Sustainable" },
                                            { id: "file", label: "CSV file" }].map((v, idx) =>
                                                <option key={"type-" + idx} value={"" + v.id}>{v.label}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Question>
                                <Action inventory={inventory}
                                    prev={{ label: "Back", path: props.prev }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}