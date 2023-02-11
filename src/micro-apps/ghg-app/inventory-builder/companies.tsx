import { useState } from "react";
import { VscAdd, VscClearAll, VscEdit } from "react-icons/vsc";
import { Toast } from "react-bootstrap";
import { EntityDetails, EntityForm } from "../../../components/v-entity/entity-form";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage, ViridiumOffcanvas } from "../../../components/v-layout/v-layout";
import { getConfigs, updateCompany, updateConfigs, eventManager, getCompany, clearCachedConfigs } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";

import { Company } from "../../viridium-model";
import { SelectCompany } from "../../../components/v-data/v-company";
import { Alert } from "../../../components/v-alert/alert";
interface FormAction {
    title: string;
    fieldDefs: Function;
    entity?: any;
    onSubmit: Function
}

export const CompanyList = (props: any) => {
    let configs = getConfigs();

    const [companies, setCompanies] = useState(configs.companies);
    const [company, setCompany] = useState<Company | undefined>(getCompany());
    const [showForm, setShowForm] = useState(false);
    const [showAlert, setShowAlert] = useState(
        {
            title: "No title", message: "No message", ttl: 10000, show: false
        }
    );


    const addACompany = (formData: any) => {
        updateCompany(Company.new(formData));
    }

    const [formAction, setFormAction] = useState<FormAction>({
        title: "Add a company",
        fieldDefs: Company.newFields,
        entity: Company.defaultEntity(),
        onSubmit: addACompany
    }
    );

    eventManager.subscribe("cached-cleared", (v: any) => {
        configs = getConfigs();
        setCompanies(configs.companies);
        setCompany(undefined);
    });

    const onSelectCompany = (evt: any, company: any) => {
        if (company) {
            let configs = getConfigs();
            let c = configs.companies.find((c: Company) => c.name === company.name);
            if (c) {
                setCompany(c);
            }
            else {
                setCompany(updateCompany(company));
            }
        }
    }

    const addCompany = () => {
        setFormAction({
            title: "Add a company",
            fieldDefs: Company.newFields,
            entity: Company.defaultEntity,
            onSubmit: addACompany
        });
        setShowForm(true);
    }

    const onUpdateCompany = (company: any, form: any) => {
        configs.companies = configs.companies.filter((c: Company) => c.name !== company.name);
        configs.companies.push(company)
        setCompany(company);
        setShowForm(false);
        updateConfigs(configs);
        updateCompany(company);
    }
    const onEditCompany = () => {
        setFormAction({
            title: "Update",
            fieldDefs: Company.newFields,
            entity: company,
            onSubmit: onUpdateCompany
        });
        setShowForm(true);
    }

    const onClearCache = () => {
        clearCachedConfigs();
        let alertMsg = {
            title: "Alert",
            message: "Cache has been cleared",
            show: false,
            ttl:10000
        }
        setShowAlert(alertMsg);
         alertMsg = {
            title: "Alert",
            message: "Cache has been cleared",
            show: true,
            ttl:10000
        }
        setShowAlert(alertMsg);

    }

    return <LayoutPage microApp={greenHouseApp} >
        <Toast>
            <Toast.Header closeButton={false}>
                <div className="me-auto">
                    <SelectCompany onSelect={onSelectCompany} />
                </div>
                <span className="v-icon-button" onClick={addCompany} ><VscAdd /></span>
                <span className="v-icon-button" onClick={onClearCache} ><VscClearAll /></span>
            </Toast.Header>
            <Toast.Body>
                {
                    company !== undefined ?
                        <div className="v-container">
                            <div className="v-panel-header">
                                <div className="v-label me-auto">
                                    {company.name}
                                </div>
                                <div className="v-buttons">
                                    <span className="v-icon-button" onClick={onEditCompany} ><VscEdit /></span>

                                </div>
                            </div>
                            <div className="v-container-body">
                                <EntityDetails title={""} entity={company} fieldDefs={Company.newFields} />
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
        <Alert title={showAlert.title} 
             ttl={showAlert.ttl}
             text={showAlert.message} show={showAlert.show} />
    </LayoutPage >
}
