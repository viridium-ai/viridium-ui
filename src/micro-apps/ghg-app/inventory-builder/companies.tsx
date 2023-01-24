import { useState } from 'react';

import { Toast } from 'react-bootstrap';
import { EntityForm, EntityList } from '../../../components/v-form/entity-form';
import { LayoutPage, ViridiumOffcanvas } from '../../../components/v-layout/v-layout';
import { getConfigs, getCompany, updateCompany } from '../../../config/v-config';
import { greenHouseApp } from '../ghg-app';

import { Company } from './model';

export const CompanyList = (props: any) => {
    const configs = getConfigs();
    const [companies, setCompanies] = useState(configs.companies);

    const [showForm, setShowForm] = useState({ show: false, mode: 'create' });

    const onSelectCompany = (company: any) => {

    }

    const listUpdated = () => {
        console.log("add company")
    }

    return <LayoutPage microApp={greenHouseApp} >
        <Toast>
            <Toast.Header closeButton={false}>
                <span className="me-auto">
                    Select Company
                </span>
            </Toast.Header>
            <Toast.Body>
                <EntityList entities={companies} title={'Companies'}
                    onSelect={onSelectCompany}
                    fieldDefs={Company.newFields} />
            </Toast.Body>
        </Toast>

        <ViridiumOffcanvas onHide={setShowForm} showForm={showForm} title={"Add a company"} >
            <EntityForm title="" fieldDefs={Company.newFields} listUpdated={listUpdated} mode={showForm.mode} />
        </ViridiumOffcanvas>
    </LayoutPage >
}
