import { useState } from "react";
import { VscRemove, VscAdd, VscCloseAll } from "react-icons/vsc";
import { Button, Toast } from "react-bootstrap";
import { EntityList, EntityForm } from "../../../components/v-entity/entity-form";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage, ViridiumOffcanvas } from "../../../components/v-layout/v-layout";
import { DataTable } from "../../../components/v-table/v-table";
import { getConfigs, updateCompany, getCompany, updateConfigs, eventManager } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { CompanyDetailsView } from "./company-config";

import { Company, Site } from "../../viridium-model";

export const CompanyList = (props: any) => {
    let configs = getConfigs();

    const [companies, setCompanies] = useState(configs.companies);
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

    const addACompany = (formData: any) => {
        let c = Company.new(formData);
        configs.companies.push(c);
        updateConfigs(configs);
        setCompanies(configs.companies);
        updateCompany(c);
    }

    const [formAction, setFormAction] = useState({
        title: "Add a company", fieldDefs: Company.newFields,
        onSubmit: addACompany
    }
    );

    eventManager.subscribe("cached-cleared", (v: any) => {
        configs = getConfigs();
        setCompanies(configs.companies);
        setCompany(undefined);
    });

    const onSelectCompany = (company: any) => {
        let c = configs.companies.find((c: Company) => c.id === company.id);
        if (c) {
            setCompany(Company.new(c));
        }
        updateCompany(c ? c : company);
    }

    const addCompany = () => {
        setFormAction({
            title: "Add a company", fieldDefs: Company.newFields,
            onSubmit: addACompany
        });
        setShowForm(true);
    }

    const addSite = () => {
        setFormAction({
            title: "Add a site", fieldDefs: Site.newFields,
            onSubmit: addASite
        })
        setShowForm(true);
    }

    const deleteCompany = () => {
        if (company) {
            configs.companies = configs.companies.filter((c: Company) => c.id !== company.id);
            updateConfigs(configs);
            updateCompany(undefined);
            setCompany(undefined);
            setCompanies(configs.companies);
        }
    }
    const removeAllSites = () => {
        if (company) {
            let c = configs.companies.find((c: Company) => c.id === company.id);
            c.sites = [];
            updateConfigs(configs);
            updateCompany(c);
            setCompany(Company.new(c));
        }
    }
    //initialize the UI

    return <LayoutPage microApp={greenHouseApp} >
        <Toast>
            <Toast.Header closeButton={false}>
                <span className="me-auto">
                    Select Company
                </span>
                <span className="v-button" onClick={addCompany} ><VscAdd /></span>
            </Toast.Header>
            <Toast.Body>
                <EntityList entities={companies} title={"Companies"} onSelect={onSelectCompany}
                    fieldDefs={Company.newFields} />
                {
                    company !== undefined ?
                        <div className="v-container">
                            <div className="v-panel-header">
                                <div className="v-label me-auto">
                                    {company.name}
                                </div>
                                <div className="v-buttons">
                                    <span className="v-icon-button" onClick={deleteCompany} ><VscRemove /></span>

                                </div>
                            </div>
                            <div className="v-container-body">
                                <CompanyDetailsView entity={company} />
                                <div className="v-divider-y" />
                                {
                                    <div>
                                        <div className="v-panel-header">
                                            <div className="v-label me-auto"> Sites </div>
                                            <div className="v-buttons">
                                                <span className="v-icon-button" onClick={addSite} ><VscAdd /></span>
                                                <span className="v-icon-button" onClick={removeAllSites} ><VscCloseAll /></span>
                                            </div>
                                        </div>
                                        <DataTable data={company.getSitesData()} onSelectRow={undefined} />
                                    </div>
                                }
                            </div>
                        </div> : ""
                }
            </Toast.Body>
            <Action next={{ label: "Next", path: props.next }} />
        </Toast>

        <ViridiumOffcanvas showTitle={false} onHide={setShowForm} showForm={showForm} title={formAction.title} >
            <EntityForm inline={true} title="" fieldDefs={formAction.fieldDefs}
                onSubmit={formAction.onSubmit} />
        </ViridiumOffcanvas>
    </LayoutPage >
}
