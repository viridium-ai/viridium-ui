import { useState } from "react";

import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../common/layout";
import { Question, Action } from "../../../common/wizard";
import { inventoryConfigApp } from "../inventory-app";
import { InventoryItem, getInventoryItem, updateInventoryItem } from "../inventory-common";

export const InventoryItemConfig = (props: any) => {

    const [report, setInventoryItem] = useState<InventoryItem>(getInventoryItem());

    const onSelectContext = (evt: any) => {
        let clone = { ...report };
        clone.context = evt.target.value;
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }
    const onSelectType = (evt: any) => {
        let clone = { ...report };
        clone.type = evt.target.value;
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }

    const onSelectStandard = (evt: any) => {
        let clone = { ...report };
        clone.standard = evt.target.value;
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }
    const onSelectRegulation = (evt: any) => {
        let clone = { ...report };
        clone.regulation = evt.target.value;
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }

    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">
                                    {report.companyName}
                                </strong>
                                Viridium Industry:   {report.category}
                            </Toast.Header>
                            <Toast.Body>
                                <Question label="Sustainability Category">
                                    <Form.Select value={report.context} onChange={onSelectContext} aria-label="">
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
                                    <Form.Select value={report.type} onChange={onSelectType} aria-label="">
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
                                    <Form.Select value={report.standard} onChange={onSelectStandard} aria-label="">
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
                                    <Form.Select value={report.regulation} onChange={onSelectRegulation} aria-label="">
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
                                <Action report={report}
                                    next={{ label: "Next", path: "/inventory-app/categories" }}
                                    prev={{ label: "Back", path: "/inventory-app" }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }

    return ui();
}