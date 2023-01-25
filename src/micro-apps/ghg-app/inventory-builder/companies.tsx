import { useState } from "react";

import { Button, Toast } from "react-bootstrap";
import { EntityForm, EntityList } from "../../../components/v-form/entity-form";
import { LayoutPage, ViridiumOffcanvas } from "../../../components/v-layout/v-layout";
import { DataTable } from "../../../components/v-table/v-table";
import { Action } from "../../../components/v-wizard";
import { getConfigs, updateCompany, getCompany, updateConfigs, eventManager } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
import { CompanyDetailsView } from "./company-config";

import { Company, Site } from "./model";

export const CompanyList = (props: any) => {
    let configs = getConfigs();

    const [companies, setCompanies] = useState(configs.companies);
    const [company, setCompany] = useState<Company | undefined>(getCompany());
    const [showForm, setShowForm] = useState({ show: false, mode: "create" });

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
    const listUpdated = () => {
        console.log("add company")
    }
    const addCompany = () => {
        setFormAction({
            title: "Add a company", fieldDefs: Company.newFields,
            onSubmit: addACompany
        });
        setShowForm({ show: true, mode: "create" });
    }

    const addSite = () => {
        setFormAction({
            title: "Add a site", fieldDefs: Site.newFields,
            onSubmit: addASite
        })
        setShowForm({ show: true, mode: "create" });
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
                <Button className="v-button" onClick={addCompany} >Add a Company</Button>
            </Toast.Header>
            <Toast.Body>
                <EntityList entities={companies} title={"Companies"} onSelect={onSelectCompany} fieldDefs={Company.newFields} />
                {
                    company !== undefined ?
                        <div className="v-container">
                            <div className="v-buttons">
                                <Button className="v-button" onClick={addSite} >Add a Site</Button>
                                <Button className="v-button" onClick={deleteCompany} >Delete</Button>
                                <Button className="v-button" onClick={removeAllSites} >Remove All Site</Button>
                            </div>
                            <div className="v-container">
                                <CompanyDetailsView entity={company} />
                                {
                                    company.getSitesData().rows.length > 0 ? <DataTable data={company.getSitesData()} onSelectRow={undefined} /> : ""
                                }
                            </div>
                        </div> : ""
                }
            </Toast.Body>
            <Action next={{ label: "Next", path: props.next }} />
        </Toast>

        <ViridiumOffcanvas showTitle={false} onHide={setShowForm} showForm={showForm} title={formAction.title} >
            <EntityForm title="" fieldDefs={formAction.fieldDefs}
                onSubmit={formAction.onSubmit} listUpdated={listUpdated} mode={showForm.mode} />
        </ViridiumOffcanvas>
    </LayoutPage >
}
