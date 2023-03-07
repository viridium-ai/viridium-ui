import { useState } from 'react';
import { Toast, Form } from 'react-bootstrap';
import { EntityForm, EntityList } from 'components/v-entity/entity-form';
import { Question, Action } from 'components/v-flow/wizard';
import { LayoutPage, ViridiumOffcanvas } from 'components/v-layout/v-layout';
import { getConfigs, getCompany, updateCompany } from 'config/v-config';
import { greenHouseApp } from '../ghg-app';

import { Company, NamedObject, Site } from '../../viridium-model';

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
    const [company, setCompany] = useState<Company | undefined>(getCompany());

    const [showForm, setShowForm] = useState(false);
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
                        company !== undefined ? <EntityList fieldDefs={Site.newFields} entities={company.sites} title={"Site"} /> : ""
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
            <EntityForm title="" fieldDefs = {Site.newFields} mode={"create"}  />
        </ViridiumOffcanvas>
    </LayoutPage >
}