import { useState } from "react";
import { Toast,} from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage, ViridiumOffcanvas } from "../../../components/v-layout/v-layout";
import { getCompany, updateCompany } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { Inventory, InventoryItem } from "../../viridium-model";
import { EntityForm, EntityList } from "../../../components/v-entity/entity-form";
import { VscAdd, VscCloseAll, VscCloudUpload, VscDatabase, VscJson } from "react-icons/vsc";
import { FileUploader } from "./file-uploader";
import { ConnectorConfig } from "./v-connector";
import { ViridiumDataset } from "./v-dataset";

export const InventoryItemsView = (props: any) => {
    let c = getCompany();
    if (c && c.inventory === undefined) {
        c.inventory = c.inventories![0];
    }
     
    
    const [inventory, setInventory] = useState<Inventory | undefined>(c?.inventory);
    const [entity, setEntity] = useState<InventoryItem | undefined>(InventoryItem.defaultEntity() as InventoryItem);
    const [items, setItems] = useState(c?.inventory?.items);
    const [showForm, setShowForm] = useState(false);
    const [showUploader, setShowUploader] = useState(false);
    const [showConnect, setShowConnect] = useState(false);
    const [showVData, setShowVData] = useState(false);
     
    const clearItems = () => {
        let c = getCompany();
        if (inventory && c) {
            let newInv = Inventory.new(inventory);
            newInv.items = [];
            c.inventory = newInv;
            updateCompany(c);
            setItems(c.inventory.items);
            setInventory(c.inventory);
        }
    }

    const onAddItem = (data: any) => {
        if(inventory) {
            let item = InventoryItem.new(data);
            let inv = Inventory.new(inventory!);
            inv.items.push(item);
            setItems([...inv.items]);
            setInventory(inv);
            let c = getCompany();
            if (c) {
                c.inventory = inv;
                updateCompany(c);
            }
            setEntity(new InventoryItem());
        }
    }

    const openItemForm = (item: any) => {
        setShowForm(true)
    }

    const openConnectorConfig = (item: any) => {
        setShowConnect(true)
    }

    const openUploader = (item: any) => {
        setShowUploader(true)
    }
    const openVData = (item: any) => {
        setShowVData(true)
    }

    const onReceiveData = (data : any) => {
        setShowUploader(false)
    }

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp}  >
                <Toast >
                    <div className="v-panel-header">
                        <div className="v-label me-auto"> Inventory {inventory?.name} {inventory?.year} </div>
                        <div className="v-buttons">
                            <span className="v-icon-button" onClick={openItemForm} ><VscAdd /></span>
                            <span className="v-icon-button" onClick={openUploader} ><VscCloudUpload /></span>
                            <span className="v-icon-button" onClick={openConnectorConfig} ><VscDatabase /></span>
                            <span className="v-icon-button" onClick={openVData} ><VscJson /></span>
                            <span className="v-icon-button" onClick={clearItems} ><VscCloseAll /></span>
                        </div>
                    </div>
                    <Toast.Body>
                        {
                            items && items.length > 0 ? <EntityList fieldDefs={InventoryItem.fieldDefs} entities={items} title={"Inventory Items"} /> : ""
                        }
                    </Toast.Body>
                    <Action
                        next={{ label: "Next", path: props.next }}
                        prev={{ label: "Back", path: props.prev }} />
                </Toast>
                <ViridiumOffcanvas id="manual"  showTitle={false} onHide={setShowForm} showForm={showForm} title={"Inventory Item"} >
                    <EntityForm inline={true} title="" entity={entity} fieldDefs={() => {
                        return InventoryItem.fieldDefs()
                    }} onSubmit={onAddItem} />
                </ViridiumOffcanvas>
                <ViridiumOffcanvas id="uploader" showTitle={false} onHide={setShowUploader} showForm={showUploader} title={"Upload Data"} >
                    <FileUploader onReceiveData={onReceiveData} />
                </ViridiumOffcanvas>

                <ViridiumOffcanvas id="connector" showTitle={false} onHide={setShowConnect} showForm={showConnect} title={"Upload Data"} >
                    <ConnectorConfig direction={"inbound"} />
                </ViridiumOffcanvas>

                <ViridiumOffcanvas id="viridiumDB" showTitle={false} onHide={setShowVData} showForm={showVData} title={"Upload Data"} >
                    <ViridiumDataset  />
                </ViridiumOffcanvas>

            </LayoutPage >
        )
    }
    return ui();
}