import { useEffect, useState } from 'react';

import { Toast, Form } from 'react-bootstrap';

import { LayoutPage } from '../../../components/layout';
import { Action, Question } from '../../../components/wizard';
import { inventoryConfigApp } from '../inventory-app';
import { Company } from '../../ghg-app/inventory-builder/model';
import { Questionnaire, getQuestionnaire, updateQuestionnaire , NamedObject} from '../inventory-common';
import { getConfigs } from '../../../config/viridium-config';


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

export const DataCollectionWizard = (props: any) => {
    const [report, setQuestionnaire] = useState<Questionnaire>(getQuestionnaire());
    const [company, setCompany] = useState<Company>();
    
    const configs = getConfigs();
    const companies: Array<Company> = configs.companies;
    const viridiumIndustries: Array<NamedObject> = configs.viridiumIndustries;
    useEffect(() => {
       
            let r = getQuestionnaire();
            if(r) {
                if (companies) {
                    let company = companies.find((c) => c.id === r.companyId);
                    setCompany(company);
                }
                setQuestionnaire(r);
            }
    }, [companies]);


    const onSelectCompany = (evt: any) => {
        let clone = { ...report };
        let company = companies.find((c) => c.id === evt.target.value);
        if (company) {
            clone.companyId = company.id;
            clone.companyName = company.name;
            setQuestionnaire(clone);
            updateQuestionnaire(clone);
            setCompany(company);
        }
    }

    const onSelectCategory = (evt: any) => {
        let clone = { ...report };
        clone.categoryId = evt.target.value;
        clone.category = viridiumIndustries.find(v=>v.id === clone.categoryId)?.name;
        setQuestionnaire(clone);
        updateQuestionnaire(clone);
    }

    const onUpdateNotes = (evt: any) => {
        let clone = { ...report };
        clone.description = evt.target.value;
        setQuestionnaire(clone);
        updateQuestionnaire(clone);
    }
    return (
        <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
            <div className="v-body">
                <div className="v-body-main">
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <span className="me-auto">Generate Questionnaires</span>
                        </Toast.Header>
                        <Toast.Body>
                            <Question label="Customer Name">
                                <Form.Select value={report.companyId} onChange={onSelectCompany} aria-label="">
                                    <option>Select a company</option>
                                    {
                                        companies.map((company, idx) =>
                                            <option key={"company-" + idx} value={"" + company.id}>{company.name}</option>
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
