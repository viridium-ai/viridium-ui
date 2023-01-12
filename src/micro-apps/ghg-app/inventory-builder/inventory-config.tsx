import { useEffect, useState } from "react";
import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Question, Action } from "../../../components/wizard";
import { getInventory } from "../../../config/viridium-config";
import { inventoryConfigApp } from "../../inventory-app/inventory-app";
import { greenHouseApp } from "../ghg-app";
import { Inventory } from "./model";
export const InventoryConfig = (props: any) => {
    const [inventory, setInventory] = useState<Inventory>(getInventory());

    const updateInventory = (clone : any) => {
        setInventory(Inventory.new(clone)!);
        updateInventory(clone);
    }

    const onSelectContext = (evt: any) => {
        let clone = { ...inventory };
        clone.context = evt.target.value;
        updateInventory(clone);
    }
    const onSelectType = (evt: any) => {
        let clone = { ...inventory };
        clone.type = evt.target.value;
        updateInventory(clone);
    }
    const onSelectStandard = (evt: any) => {
        let clone = { ...inventory };
        clone.standard = evt.target.value;
        updateInventory(clone);
    }

    const onSelectRegulation = (evt: any) => {
        let clone = { ...inventory };
        clone.regulation = evt.target.value;
        updateInventory(clone);
    }

    const ui = () => {
        console.log(inventory.context);

        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                <div className="v-body">
                    <div className="v-body-main">
                        {
                            inventory ? <Toast >
                                <Toast.Header closeButton={false}>
                                    <span className="me-auto">
                                        Config Inventory
                                    </span>
                                    {inventory.company?.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <Question label="Sustainability Category">
                                        <Form.Select value={inventory.context} onChange={onSelectContext} aria-label="">
                                            <option>Select a category</option>
                                            {
                                                [{ id: "Carbon", label: "Carbon" },
                                                { id: "Water", label: "Water" },
                                                { id: "Waste", label: "Waste" }].map((v, idx) =>
                                                    <option key={"type-" + idx} value={"" + v.id}>{v.label}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Question>

                                    <Question label="Scope of Data Coverage">
                                        <Form.Select value={inventory.type} onChange={onSelectType} aria-label="">
                                            <option>Select a scope</option>
                                            {
                                                [
                                                    { id: "Corporate", label: "Corporate" },
                                                    { id: "Product", label: "Product" },
                                                    { id: "Activity", label: "Activity" }
                                                ].map((v, idx) =>
                                                    <option key={"type-" + idx} value={"" + v.id}>{v.label}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Question>

                                    <Question label="Standards">
                                        <Form.Select value={inventory.standard} onChange={onSelectStandard} aria-label="">
                                            <option>Select a standard</option>
                                            {
                                                [
                                                    { id: "1", label: "ISSB" },
                                                    { id: "2", label: "EU-PEF and EU-PEFCR" },
                                                    { id: "3", label: "ISO/DIS 14067" },
                                                    { id: "4", label: "GHG Protocol" },
                                                    { id: "5", label: "PAS 2050" },
                                                    { id: "6", label: "EPD" }
                                                ].map((v, idx) =>
                                                    <option key={"type-" + idx} value={"" + v.label}>{v.label}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Question>
                                    <Question label="Regulations">
                                        <Form.Select value={inventory.regulation} onChange={onSelectRegulation} aria-label="">
                                            <option>Select a regulation</option>
                                            {
                                                [
                                                    { id: "1", label: "NFRD (Non Financial Reporting Directive)" },
                                                    { id: "2", label: "SFDR (Sustainable Finance Disclosure Regulation )" },
                                                    { id: "3", label: "CRFD (Climate-related Financial Disclosure)" },
                                                    { id: "4", label: "CBAM (Carbon Border Adjustment Mechanism)" },
                                                    { id: "5", label: "ETS" },
                                                    { id: "6", label: "Effort Sharing Regulation" },
                                                    { id: "7", label: "Low Carbon Benchmark Regulation" }
                                                ].map((v, idx) =>
                                                    <option key={"type-" + idx} value={"" + v.label}>{v.label}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Question>
                                    <Action inventory={inventory}
                                        next={{ label: "Next", path: props.next }}
                                        prev={{ label: "Back", path: props.prev }} />
                                </Toast.Body>
                            </Toast> : ""
                        }
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}