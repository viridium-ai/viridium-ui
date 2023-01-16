import { useState } from 'react';

import { Toast, Form } from 'react-bootstrap';
import { LayoutPage } from '../../../components/v-layout/v-layout';
import { DataTable } from '../../../components/v-table/v-table';
import { Action, Question } from '../../../components/v-wizard';
import { getConfigs, getCompany, updateCompany } from '../../../config/v-config';
import { NamedObject } from '../../inventory-app/inventory-questionaire';
import { greenHouseApp } from '../ghg-app';

import { Company } from './model';

export const CompanyDetailsView = (props: any) => {
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
    const [company, setCompany] = useState<Company | undefined>(Company.new(getCompany()));
    const companies: Array<Company> = configs.companies;
    const viridiumIndustries: Array<NamedObject> = configs.viridiumIndustries;

    const onSelectCompany = (evt: any) => {
        let c = companies.find((c) => c.id === evt.target.value);
        if (c) {
            const saved = getCompany(c.id);
            if (saved) {
                c = Company.new(saved);
            } else {
                c = Company.new(c);
            }
            if (c) {
                setCompany(c);
                updateCompany(c);
            }
        }
    }

    const onSelectIndustry = (evt: any) => {
        if (company) {
            const c = Company.new(company)!;
            c.industry = evt.target.value;
            setCompany(c);
            updateCompany(c);
        }
    }

    const onUpdateNotes = (evt: any) => {
        if (company) {
            const c = Company.new(company)!;
            c.description = evt.target.value;
            setCompany(c);
            updateCompany(c);
        }
    }

    return <LayoutPage microApp={greenHouseApp} >
            <Toast>
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
                                companies.map((c, idx) =>
                                    <option key={"company-" + idx} value={"" + c.id}>{c.name}</option>
                                )
                            }
                        </Form.Select>
                        <div className="company-details">
                            <CompanyDetailsView entity={company} />
                        </div>
                        {
                            company !== undefined ? <DataTable data={company.getSitesData()} onSelectRow={undefined} /> : ""
                        }
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
                    </Question>
                    <Question label="Notes">
                        <Form.Control value={company ? company.description : ""} onChange={onUpdateNotes} as="textarea" rows={3} />
                    </Question>
                </Toast.Body>

                <Action next={{ label: "Next", path: props.next }} />
            </Toast>
    </LayoutPage >

}
