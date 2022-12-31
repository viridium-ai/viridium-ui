import { useState } from "react";
import { Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { Question, Action } from "../../../components/wizard";
import { inventoryConfigApp } from "../inventory-app";
import { InventoryItem, getInventoryItem } from "../inventory-common";

export const Analytics = (props: any) => { 
    const [report] = useState<InventoryItem>(getInventoryItem());
    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                    {report.companyName}
                                </span>
                                Viridium Industry:   {report.category}
                            </Toast.Header>
                            <Toast.Body>
                                <Question label="" id="org">
                                    TBD
                                </Question>
                                
                                <Action next={{ label: "Next", path: "/inventory-app/5" }} prev={{ label: "Back", path: "/inventory-app/3" }} />

                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}