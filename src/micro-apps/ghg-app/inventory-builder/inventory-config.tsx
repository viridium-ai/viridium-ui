import { useEffect, useState } from "react";
import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Question, Action } from "../../../components/wizard";
import { getConfigs, getInventory, getCompany, updateInventory, updateCompany } from "../../../config/viridium-config";
import { inventoryConfigApp } from "../../inventory-app/inventory-app";
import { Company, Inventory } from "./model";
export const InventoryConfig = (props: any) => {
    const configs = getConfigs();
    const [inventory, setInventory] = useState<Inventory>(getInventory());
    const [company, setCompany] = useState<Company>(getCompany());
    useEffect(() => {
        let r = getCompany();
        if (r) {
            if (configs.companies) {
                let c = Company.new(r);
                if (c) {
                    if (c.inventories && c.inventories.length > 0) {
                        setInventory(c.inventories[0]);
                        updateInventory(c.inventories[0]);
                    } else {
                        const inv = new Inventory();
                        inv.scope = "1";
                        c.inventories.push(inv);
                        setInventory(inv);
                        updateInventory(inv);
                    }
                    setCompany(c);
                    updateCompany(c);
                }
            }
        }
    }, []);

    const onSelectContext = (evt: any) => {
        let clone = company?.inventories.find((i) => i.id === inventory?.id);
        if (clone) {
            clone.context = evt.target.value;
            setInventory(Inventory.new(clone)!);
            updateCompany(company);
            updateInventory(clone);
        }

    }
    const onSelectType = (evt: any) => {
        let clone = company?.inventories.find((i) => i.id === inventory?.id);
        if (clone) {
            clone.type = evt.target.value;
            setInventory(Inventory.new(clone)!);
            updateCompany(company);
            updateInventory(clone);
        }
    }
    const onSelectStandard = (evt: any) => {
        let clone = company?.inventories.find((i) => i.id === inventory?.id);

        if (clone) {
            clone.standard = evt.target.value;
            setInventory(Inventory.new(clone)!);
            updateCompany(company);
            updateInventory(clone);
        }
    }
    const onSelectRegulation = (evt: any) => {
        let clone = company?.inventories.find((i) => i.id === inventory?.id);
        if (clone) {
            clone.regulation = evt.target.value;
            setInventory(Inventory.new(clone)!);
            updateCompany(company);
        }
    }
    const ui = () => {
        let company = inventory?.company;
        console.log(company);
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        {
                            inventory ? <Toast >
                                <Toast.Header closeButton={false}>
                                    <span className="me-auto">
                                        Config Inventory
                                    </span>
                                    {company?.name}
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