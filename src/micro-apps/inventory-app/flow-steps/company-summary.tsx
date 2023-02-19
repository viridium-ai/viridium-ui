import { useEffect, useState } from 'react';

import { Toast, Form } from 'react-bootstrap';

import { LayoutPage } from '../../../components/v-layout/v-layout';
import { inventoryConfigApp } from '../inventory-app';
import { Company } from '../../viridium-model';
import { Questionnaire, getQuestionnaire, updateQuestionnaire, NamedObject } from '../inventory-questionaire';
import { getConfigs, getValueChainTemplates } from '../../../config/v-config';
import { Question, Action } from '../../../components/v-flow/wizard';
import { StringUtils } from '../../../components/v-utils/v-string-utils';

export const CompanyDetails = (props: any) => {
    const ui = () => {
        const company = new Company();
        Object.assign(company, props.entity);
        return (
            <div>
                {company.name} <br />
                {company.getAddress()} <br />
                {company.firstName + " " + company.lastName} <br />
                {company.sourceId} <br />
                {company.id} <br />
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
        if (r) {
            if (companies) {
                let company = companies.find((c) => c.id === r.companyId);
                setCompany(company);
            }
            //setQuestionnaire(r);
        }
    },[]);


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
        clone.templateName = evt.target.value;
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
        <LayoutPage microApp={inventoryConfigApp}  >
            <Toast >
                <Toast.Header closeButton={false}> <span className="me-auto">Generate Questionnaires</span>
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
                    <Question label="Value Chain Template">
                        <Form.Select value={report.templateName} onChange={onSelectCategory} aria-label="">
                            <option>Select a template</option>
                            {
                                getValueChainTemplates().map((v, idx) =>
                                    <option key={"type-" + idx} value={"" + v.name}>{StringUtils.t(v.name)}</option>
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
                    <Action next={{ label: "Next", path: props.next }} />
                </Toast.Body>
            </Toast>
        </LayoutPage >
    )
}
