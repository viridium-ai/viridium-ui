import { useState } from "react";
import { VscAdd, VscCloseAll } from "react-icons/vsc";
import { Toast } from "react-bootstrap";
import { EntityForm, EntityList } from "components/v-entity/entity-form";
import { Action } from "components/v-flow/wizard";
import { LayoutPage, ViridiumOffcanvas } from "components/v-layout/v-layout";
import { getConfigs, updateCompany, updateConfigs, getCompany } from "config/v-config";
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
    let c = getCompany();
    const [company, setCompany] = useState<Company | undefined>(c);
    const [sites, setSites] = useState<Array<Site> | undefined>(c?.sites);
    const [showForm, setShowForm] = useState(false);

    const addASite = (formData: any, site: any) => {
        console.log(formData, site);
        if (company) {
            let s = Site.new(formData);
            let c = configs.companies.find((c: Company) => c.name === company.name);
            c.sites.push(s);
            setCompany(updateCompany(c));
            setSites([...c.sites]);
        }
    }

    const openSiteForm = () => {
        setFormAction({
            title: "Add a site",
            fieldDefs: Site.newFields,
            onSubmit: addASite,
            entity: Site.defaultEntity()
        })
        setShowForm(true);
    }
    const [formAction, setFormAction] = useState<FormAction>({
        title: "Add a site",
        fieldDefs: Site.newFields,
        entity: Site.defaultEntity(),
        onSubmit: addASite
    }
    );
    const removeAllSites = () => {
        if (company) {
            let c = configs.companies.find((c: Company) => c.id === company.id);
            c.sites = [];
            setCompany(updateCompany(c));
            setSites([]);
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
                                                <span className="v-icon-button" onClick={openSiteForm} ><VscAdd /></span>
                                                <span className="v-icon-button" onClick={removeAllSites} ><VscCloseAll /></span>
                                            </div>
                                        </div>
                                        <EntityList fieldDefs={Site.newFields} entities={sites ? sites : []} title={"Sites"} />
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
