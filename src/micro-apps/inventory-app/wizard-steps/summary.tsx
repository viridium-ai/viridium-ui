import { useEffect, useState } from 'react';

import { Toast, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { LayoutPage } from '../../../common/layout';
import { securityManager } from '../../../common/security/security-manager';
import { Action, Question } from '../../../common/wizard';
import { inventoryConfigApp } from '../inventory-app';
import { InventoryItem, getInventoryItem, updateInventoryItem } from '../inventory-common';

class Company  {
    id: string = "";
    name: string = "";
    industry?: string;
    viridiumCategory?: string;
    lastUpdatedDate?: Date;
    lastUpdatedBy?: string;
    sourceId?: string;
    source?: string;
    street1?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;   
    getAddress = () => {
        return this.street1 + " " + this.city + " " + this.state + " " + this.zipCode;
    }
}

export const CompanyDetails = (props: any) => {
    const ui = () => {
        const company = new Company();
         Object.assign(company, props.entity);
        return (
            <div>
                {company.name} <br/>
                {company.getAddress()} <br/>
                {company.firstName + " " + company.lastName} <br/>
                {company.sourceId} <br/>
                {company.id} <br/>
            </div>
        )
    }
    return props.entity ? ui() : null;
}

interface NamedObject {
    id: string,
    name: string
}

export const DataCollectionWizard = (props: any) => {
    const navigate = useNavigate();
    const [report, setInventoryItem] = useState<InventoryItem>(getInventoryItem());
    const [company, setCompany] = useState<Company>();
    
    const configs = require('./configs.json');
    const companies: Array<Company> = configs.companyDetails;
    const viridiumIndustries: Array<NamedObject> = configs.viridiumIndustries;

    useEffect(() => {
        if(!securityManager.isSignedIn()) {
            console.log("redirect to login");
            navigate("/login?from=/inventory-app");
        } else {
            let r = getInventoryItem();
            if(r) {
                if (companies) {
                    let company = companies.find((c) => c.id === r.companyId);
                    setCompany(company);
                }
                setInventoryItem(r);
            }
        }
    }, [companies, navigate]);


    const onSelectCompany = (evt: any) => {
        let clone = { ...report };
        let company = companies.find((c) => c.id === evt.target.value);
        if (company) {
            clone.companyId = company.id;
            clone.companyName = company.name;
            setInventoryItem(clone);
            updateInventoryItem(clone);
            setCompany(company);
        }
    }

    const onSelectCategory = (evt: any) => {
        let clone = { ...report };
        clone.categoryId = evt.target.value;
        clone.category = viridiumIndustries.find(v=>v.id === clone.categoryId)?.name;
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }

    const onUpdateNotes = (evt: any) => {
        let clone = { ...report };
        clone.description = evt.target.value;
        setInventoryItem(clone);
        updateInventoryItem(clone);
    }
    return (
        <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
            <div className="wizard-body">
                <div className="wizard-body-main">
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">Generate Questionnaires</span>
                        </Toast.Header>
                        <Toast.Body>
                            <Question label="Customer Name">
                                <Form.Select value={report.companyId} onChange={onSelectCompany} aria-label="">
                                    <option>Select a company</option>
                                    {
                                        companies.map((campany, idx) =>
                                            <option key={"company-" + idx} value={"" + campany.id}>{campany.name}</option>
                                        )
                                    }
                                </Form.Select>
                            </Question>
                            <Question label="Viridium Industry">
                                <Form.Select value={report.categoryId} onChange={onSelectCategory} aria-label="">
                                    <option>Select a category</option>
                                    {
                                        viridiumIndustries.map((v, idx) =>
                                            <option key={"type-" + idx} value={"" + v.id}>{v.name}</option>
                                        )
                                    }
                                </Form.Select>

                                <div className="company-details">
                                    <CompanyDetails entity={company} />
                                </div>
                            </Question>
                            <Question label="Notes">
                                <Form.Control value={report.description} onChange={onUpdateNotes} as="textarea" rows={3} />
                            </Question>
                            <Action next={{ label: "Next", path: "/inventory-app/config" }} />
                        </Toast.Body>
                    </Toast>
                </div>
            </div>
        </LayoutPage >
    )
}
