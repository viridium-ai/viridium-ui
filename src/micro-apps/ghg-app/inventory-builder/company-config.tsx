import { useState } from 'react';

import { Toast, Form } from 'react-bootstrap';
import { EntityForm } from '../../../components/v-form/entity-form';
import { LayoutPage, ViridiumOffcanvas } from '../../../components/v-layout/v-layout';
import { DataTable } from '../../../components/v-table/v-table';
import { Action, Question } from '../../../components/v-wizard';
import { getConfigs, getCompany, updateCompany } from '../../../config/v-config';
import { NamedObject } from '../../inventory-app/inventory-questionaire';
import { greenHouseApp } from '../ghg-app';

import { Company, Site } from './model';

export const CompanyDetailsView = (props: any) => {
    const ui = () => {
        const company = new Company();
        Object.assign(company, props.entity);
        return (
            <div className="v-container">
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

    const [showForm, setShowForm] = useState({ show: false, mode: 'create' });
    const viridiumIndustries: Array<NamedObject> = configs.viridiumIndustries;

    const onSelectIndustry = (evt: any) => {
        if (company) {
            const c = Company.new(company)!;
            c.viridiumCategory = evt.target.value;
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
     
    const listUpdated = () => {
        // updateAction(!refreshState);
    }

    return <LayoutPage microApp={greenHouseApp} >
        <Toast>
            <Toast.Header closeButton={false}>
                <span className="me-auto">
                {company?.name}
                </span>
            </Toast.Header>
            <Toast.Body>
                <Question label="Customer Name">
                    <div className="company-details">
                        <CompanyDetailsView entity={company} />
                    </div>
                    {
                        company !== undefined ? <DataTable data={company.getSitesData()} onSelectRow={undefined} /> : ""
                    }
                </Question>
                <Question label="Viridium Industry">
                    <Form.Select value={company ? company.viridiumCategory : ""} onChange={onSelectIndustry} aria-label="">
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
            <Action next={{ label: "Next", path: props.next }}
                        prev={{ label: "Back", path: props.prev }} />
        </Toast>
        <ViridiumOffcanvas onHide={setShowForm} showForm={showForm} title={"Add a site"} >
            <EntityForm title="" fieldDefs = {Site.newFields} listUpdated={listUpdated} mode={showForm.mode}  />
        </ViridiumOffcanvas>
    </LayoutPage >
}
