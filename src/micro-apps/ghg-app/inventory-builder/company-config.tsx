import { useEffect, useState } from 'react';

import { Toast, Form } from 'react-bootstrap';

import { LayoutPage } from '../../../components/layout';
import { Action, Question } from '../../../components/wizard';
import { inventoryConfigApp } from '../../inventory-app/inventory-app';
import { NamedObject } from '../../inventory-app/inventory-common';

import { Company, getConfigs, getInventory, Inventory, updateConfigs, updateInventory } from './model';

export const CompanyDetails = (props: any) => {
    const ui = () => {
        const company = new Company();
        Object.assign(company, props.entity);
        return (
            <div>
                {company.name} <br />
                {company.getAddress()} <br />
                {company.firstName + " " + company.lastName} <br />
                {company.id} <br />
            </div>
        )
    }
    return props.entity ? ui() : null;
}

export const CompanyConfig = (props: any) => {
    const configs = getConfigs();
    const [inventory, setInventory] = useState<Inventory>(getInventory());
    const [company, setCompany] = useState<Company>();
    const companies: Array<Company> = configs.companies;
    const viridiumIndustries: Array<NamedObject> = configs.viridiumIndustries;
    useEffect(() => {
        let r = getInventory();
        if (r) {
            setInventory(r);
            if (companies) {
                let c = companies.find((c) => c.id === r.companyId);
                if (c) {
                    r.company = c;
                    setCompany(c);
                }
            }
            setInventory(r);
        }
    }, []);


    const onSelectCompany = (evt: any) => {
        let clone = { ...inventory };
        let c = companies.find((c) => c.id === evt.target.value);
        if (c) {
            clone.companyId = c.id;
            clone.company = c;
            setInventory(clone);
            setCompany(c);
            updateInventory(clone);
        }
    }

    const onSelectIndustry = (evt: any) => {
        let c = configs.companies.find((c: any) => c.id === company?.id);
        if (c) {
            c.industry = evt.target.value;
        }
        setCompany(c);
        updateConfigs(configs);
    }

    const onUpdateNotes = (evt: any) => {
        let c = configs.companies.find((c: any) => c.id === company?.id);
        if (c) {
            c.description = evt.target.value;
        }
        setCompany(c);
        updateConfigs(configs);
    }
    return (
        <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
            <div className="wizard-body">
                <div className="wizard-body-main">
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">
                                Config Company
                            </span>
                            {
                                company ? company.name : ""
                            }
                        </Toast.Header>
                        <Toast.Body>
                            <Question label="Customer Name">
                                <Form.Select value={company?.id} onChange={onSelectCompany} aria-label="">
                                    <option>Select a company</option>
                                    {
                                        companies.map((campany, idx) =>
                                            <option key={"company-" + idx} value={"" + campany.id}>{campany.name}</option>
                                        )
                                    }
                                </Form.Select>
                            </Question>
                            <Question label="Viridium Industry">
                                <Form.Select value={company ? company.industry : ""} onChange={onSelectIndustry} aria-label="">
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
                                <Form.Control value={company ? company.description : ""} onChange={onUpdateNotes} as="textarea" rows={3} />
                            </Question>
                            <Action next={{ label: "Next", path: props.next }} />
                        </Toast.Body>
                    </Toast>
                </div>
            </div>
        </LayoutPage >
    )
}
