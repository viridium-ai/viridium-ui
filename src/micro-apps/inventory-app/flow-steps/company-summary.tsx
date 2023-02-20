import { PureComponent } from 'react';

import { Toast, Form } from 'react-bootstrap';

import { LayoutPage } from '../../../components/v-layout/v-layout';
import { inventoryConfigApp } from '../inventory-app';
import { Company } from '../../viridium-model';
import { Questionnaire, getQuestionnaire, updateQuestionnaire, NamedObject } from '../inventory-questionnaire';
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
interface CompanySummaryState {
    report: Questionnaire,
    selectedCompany?: Company,
    companies?: Array<Company>
}

export class CompanySummary extends PureComponent<any, CompanySummaryState> {

    constructor(props: any) {
        super(props);
        let report = getQuestionnaire();
        let companies = getConfigs().companies as Array<Company>;
        let selectedCompany = companies.find((c) => c.id === report.companyId)
        this.state = { report: report, selectedCompany: selectedCompany, companies: getConfigs().companies }
    }

    onSelectCompany = (evt: any) => {
        let clone = { ...this.state.report };
        let company = this.state.companies?.find((c) => c.id === evt.target.value);
        if (company) {
            clone.companyId = company.id;
            clone.companyName = company.name;
            updateQuestionnaire(clone);
            this.setState({ selectedCompany: company, report: clone })
        }
    }

    onChangeTemplate = (evt: any) => {
        let clone = { ...this.state.report };
        clone.inventoryItems = [];
        clone.templateName = evt.target.value;
        updateQuestionnaire(clone);
        this.setState({ report: clone })
    }

    onUpdateNotes = (evt: any) => {
        let clone = { ...this.state.report };
        clone.description = evt.target.value;
        updateQuestionnaire(clone);
        this.setState({ report: clone })
    }
    render = () => {
        let report = this.state.report;
        let companies = this.state.companies;
        let company = this.state.selectedCompany;
        return (
            <LayoutPage microApp={inventoryConfigApp}  >
                <Toast >
                    <Toast.Header closeButton={false}> <span className="me-auto">Generate Questionnaires</span>
                    </Toast.Header>
                    <Toast.Body>
                        <Question label="Customer Name">
                            <Form.Select value={report.companyId} onChange={this.onSelectCompany} aria-label="">
                                <option>Select a company</option>
                                {
                                    companies?.map((company, idx) =>
                                        <option key={"company-" + idx} value={"" + company.id}>{company.name}</option>
                                    )
                                }
                            </Form.Select>
                        </Question>
                        <Question label="Value Chain Template">
                            <Form.Select value={report.templateName} onChange={this.onChangeTemplate} aria-label="">
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
                            <Form.Control value={report.description} onChange={this.onUpdateNotes} as="textarea" rows={3} />
                        </Question>
                        <div className="v-footer v-flex">
                            <Action next={{ label: "Next", path: this.props.next }} />
                        </div>

                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
}
