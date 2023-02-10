import { useState } from "react";
import { Toast } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage, ViridiumOffcanvas } from "../../../components/v-layout/v-layout";

import { getCompany, updateCompany } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { Company, Inventory } from "../../viridium-model";
import { EntityForm, EntityList } from "../../../components/v-entity/entity-form";
import { VscAdd } from "react-icons/vsc";
import { StringUtils } from "../../../components/v-utils/v-string-utils";
export const InventoryConfig = (props: any) => {
    const [company, setCompany] = useState<Company | undefined>(getCompany());
    const [showForm, setShowForm] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState<Inventory | undefined>();

    const updateInv = (clone: any) => {
        let inv = Inventory.new(clone);
        console.log(inv);
        if(company?.inventories) {
            company.inventories.push(inv);
            updateCompany(company);
        }
        setSelectedInventory(inv);

        setShowForm(false);
    }

    const addInventory = () => {

        setShowForm(true);
    }
    const onSelect = (selected: any) => {

    }
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} >
                {
                    company ? <Toast >
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                Inventory for  {company?.name}
                            </span>
                            <span className="v-button" onClick={addInventory} ><VscAdd /></span>
                        </Toast.Header>
                        <Toast.Body>
                            <EntityList entities={company!.inventories ? company!.inventories : []}
                                fieldDefs={Inventory.fieldDefs} title={"Inventories"} onSelect={onSelect} />
                        </Toast.Body>
                        <Action inventory={selectedInventory}
                            next={{ label: "Next", path: props.next }}
                            prev={{ label: "Back", path: props.prev }} />
                    </Toast> : ""
                }
                <ViridiumOffcanvas showTitle={false} onHide={setShowForm} showForm={showForm} title={StringUtils.t("addInventory")} >
                    <EntityForm inline={false} title="" fieldDefs={Inventory.fieldDefs}
                        onSubmit={updateInv} />
                </ViridiumOffcanvas>
            </LayoutPage >
        )
    }
    return ui();
}