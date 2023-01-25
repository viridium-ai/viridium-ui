import { useState } from "react";
import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { Question, Action } from "../../../components/v-wizard";
import { getCompany, updateCompany } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { Company } from "./model";
export const InventoryConfig = (props: any) => {
    const [company, setCompany] = useState<Company>(getCompany());

    const updateInv = (clone: any) => {
        let c = Company.new(company)!;
        c.inventory = clone;
        setCompany(c);
        updateCompany(c);
    }

    const onSelectContext = (evt: any) => {
        let clone = { ...company.inventory };
        clone.context = evt.target.value;
        updateInv(clone);
    }
    const onSelectType = (evt: any) => {
        let clone = { ...company.inventory };
        clone.type = evt.target.value;
        updateInv(clone);
    }
    const onSelectStandard = (evt: any) => {
        let clone = { ...company.inventory };
        clone.standard = evt.target.value;
        updateInv(clone);
    }

    const onSelectRegulation = (evt: any) => {
        let clone = { ...company.inventory };
        clone.regulation = evt.target.value;
        updateInv(clone);
    }

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} >
                        {
                            company.inventory ? <Toast >
                                <Toast.Header closeButton={false}>
                                    <span className="me-auto">
                                        Config Inventory
                                    </span>
                                    {company?.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <Question label="Sustainability Category">
                                        <Form.Select value={company.inventory.context} onChange={onSelectContext} aria-label="">
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
                                        <Form.Select value={company.inventory.type} onChange={onSelectType} aria-label="">
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
                                        <Form.Select value={company.inventory.standard} onChange={onSelectStandard} aria-label="">
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
                                        <Form.Select value={company.inventory.regulation} onChange={onSelectRegulation} aria-label="">
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
                                    
                                </Toast.Body>
                                <Action inventory={company.inventory}
                                        next={{ label: "Next", path: props.next }}
                                        prev={{ label: "Back", path: props.prev }} />
                            </Toast> : ""
                        }
            </LayoutPage >
        )
    }
    return ui();
}