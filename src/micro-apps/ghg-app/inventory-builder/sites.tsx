import { useState } from "react";
import { VscAdd, VscCloseAll } from "react-icons/vsc";
import { Toast } from "react-bootstrap";
import { EntityForm, EntityList } from "../../../components/v-entity/entity-form";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage, ViridiumOffcanvas } from "../../../components/v-layout/v-layout";
import { getConfigs, updateCompany, updateConfigs, getCompany } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";

import { Company, Site } from "../../viridium-model";
interface FormAction {
    title: string;
    fieldDefs: Function;
    entity?: any;
    onSubmit: Function
}

export const SiteList = (props: any) => {
    let configs = getConfigs();
    const [company, setCompany] = useState<Company | undefined>(getCompany());
    const [showForm, setShowForm] = useState(false);

    const addASite = (formData: any) => {
        if (company) {
            let s = Site.new(formData);
            let c = configs.companies.find((c: Company) => c.id === company.id);
            c.sites.push(s!);
            updateConfigs(configs);
            updateCompany(c);
            setCompany(Company.new(c));
        }
    }
    const addSite = () => {
        setFormAction({
            title: "Add a site",
            fieldDefs: Site.newFields,
            onSubmit: addASite
        })
        setShowForm(true);
    }
    const [formAction, setFormAction] = useState<FormAction>({
        title: "Add a site",
        fieldDefs: Site.newFields,
        entity: undefined,
        onSubmit: addSite
    }
    );
    const removeAllSites = () => {
        if (company) {
            let c = configs.companies.find((c: Company) => c.id === company.id);
            c.sites = [];
            updateConfigs(configs);
            updateCompany(c);
            setCompany(Company.new(c));
        }
    }

    return <LayoutPage microApp={greenHouseApp} >
        <Toast>
            <Toast.Header closeButton={false}>
                <div className="me-auto">
                    {company?.name}
                </div>
            </Toast.Header>
            <Toast.Body>
                {
                    company !== undefined ?
                        <div className="v-container">
                            <div className="v-container-body">
                                {
                                    <div>
                                        <div className="v-panel-header">
                                            <div className="v-label me-auto"> Sites </div>
                                            <div className="v-buttons">
                                                <span className="v-icon-button" onClick={addSite} ><VscAdd /></span>
                                                <span className="v-icon-button" onClick={removeAllSites} ><VscCloseAll /></span>
                                            </div>
                                        </div>
                                        <EntityList fieldDefs={Site.newFields} entities={company.sites} title={"Sites"} />
                                    </div>
                                }
                            </div>
                        </div> : ""
                }
            </Toast.Body>
            {
                company !== undefined ? <Action next={{ label: "Next", path: props.next }} /> : ""
            }
        </Toast>

        <ViridiumOffcanvas showTitle={false} onHide={setShowForm} showForm={showForm} title={formAction.title} >
            <EntityForm inline={true} title="" fieldDefs={formAction.fieldDefs} entity={formAction.entity}
                onSubmit={formAction.onSubmit} />
        </ViridiumOffcanvas>
    </LayoutPage >
}
