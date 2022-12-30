import { useState } from "react";

import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../common/layout";
import { Question, Action } from "../../../common/wizard";
import { greenHouseApp } from "../ghg-app";
import { InventoryReport, Verifier, getReport, updateReport } from "../ghg-common";

export const InventoryConfig = (props: any) => {

    const [report, setReport] = useState<InventoryReport>(getReport());

    const handleCompanyNameChange = (evt: any) => {
        let clone = { ...report };
        clone.companyName = evt.target.value;
        setReport(clone);
    }

    const handleVerifiedChanged = (evt: any) => {
        let clone = { ...report };
        clone.verified = evt.target.checked;
        if (!clone.verifiedBy) {
            clone.verifiedBy = new Verifier();
        }
        setReport(clone);
    }

    const onSelectYear = (evt: any) => {
        let clone = { ...report };
        clone.reportYear = evt.target.value;
        setReport(clone);
    }

    const handleBaseYearChanged = (evt: any) => {
        let clone = { ...report };
        clone.baseYear = evt.target.value;
        setReport(clone);
    }


    const handleUpdateVerifier = (evt: any) => {
        let clone = { ...report };
        let cloneVerifier = new Verifier();
        Object.assign(cloneVerifier, report.verifiedBy);

        switch (evt.target.id) {
            case "date":
                cloneVerifier.date = evt.target.value;
                break;
            case "name":
                cloneVerifier.name = evt.target.value;
                break;
            case "email":
                cloneVerifier.email = evt.target.value;
                break;
            case "phone":
                cloneVerifier.phone = evt.target.value;
                break;
            case "address":
                cloneVerifier.address = evt.target.value;
                break;
            case "default":
                break;
        }
        clone.verifiedBy = cloneVerifier;
        setReport(clone);
    }

    const verifiedQuestions = () => {
        return report.verified ? (
            <div className="wizard-sub-questions">
                <Question label="Date of Verification" >
                    <Form.Control onChange={handleUpdateVerifier} type="date" value={report.verifiedBy?.date} placeholder="Date of Verification" id="date" /></Question>
                <Question label="Verifier" >
                    <Form.Control onChange={handleUpdateVerifier} type="text" value={report.verifiedBy?.name} placeholder="Name" id="name" /></Question>
                <Question label="EMail" >
                    <Form.Control onChange={handleUpdateVerifier} type="email" value={report.verifiedBy?.email} placeholder="EMail" id="email" /></Question>
                <Question label="Phone" >
                    <Form.Control onChange={handleUpdateVerifier} type="phone" value={report.verifiedBy?.phone} placeholder="Phone" id="phone" /></Question>
                <Question label="Address" >
                    <Form.Control onChange={handleUpdateVerifier} type="text" value={report.verifiedBy?.address} placeholder="Address" id="address" /></Question>
            </div>
        ) : (
            <div></div>
        );
    }

    const onNext = () => {
        updateReport(report);
    }

    const ui = () => {

        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Summary</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Question label="Company Name"><Form.Control type="text" onChange={handleCompanyNameChange} value={report.companyName} placeholder="Your company name" /></Question>
                                <Question label="Company Logo">
                                    <Form.Control type="file" placeholder="Company logo" />
                                </Question>

                                <Question label="Report Year">
                                    <Form.Select value={report.reportYear} onChange={onSelectYear} aria-label="Inventory Year">
                                        <option>Select a year</option>
                                        {
                                            Array.from({ length: 20 }, (x, i) => 2000 + i).map((year, idx) =>
                                                <option key={"year" + year} value={"" + year}>{year}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Question>

                                <Question label="Base Year">
                                    <Form.Select value={report.baseYear} onChange={handleBaseYearChanged} aria-label="Base Year">
                                        <option>Select a year</option>
                                        {
                                            Array.from({ length: 10 }, (x, i) => 2000 + i).map((year, idx) =>
                                                <option key={"year" + year} value={"" + year}>{year}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Question>

                                <Question label="Has this inventory been verified by an accredited third party?">
                                    <Form.Check
                                        type="checkbox"
                                        id={`verified-by`}
                                        checked={report.verified}
                                        onChange={handleVerifiedChanged}
                                        label=""
                                    />
                                    {
                                        verifiedQuestions()
                                    }
                                </Question>
                                <Action onNext={onNext}  next={{ label: "Next", path: "/wizard/2" }} prev={{ label: "Back", path: "/wizard" }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="wizard-body-help">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Help for Planning </strong>
                            </Toast.Header>
                            <Toast.Body>
                                Setup can be a wizard-like prompt/challenge to the user to enter the following details.
                                <ul>
                                    <li>
                                        Company Name
                                    </li>
                                    <li>
                                        Inventory Year
                                    </li>
                                    <li>
                                        Company Logo
                                    </li>
                                    <li>
                                        Organizational Boundary
                                        <ul>
                                            <li>
                                                Equity Share
                                            </li>
                                            <li>
                                                Financial Control
                                            </li>
                                            <li>
                                                Operational Control
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Emission Scope
                                        <ul>
                                            <li>
                                                Scope 1
                                            </li>
                                            <li>
                                                Scope 2
                                            </li>
                                            <li>
                                                Scope 3
                                            </li>

                                        </ul>
                                    </li>
                                    <li>Scope 2 Setup
                                        <ul>
                                            <li>
                                                Select if Market-Based and/or Location-based method
                                            </li>
                                            <li>
                                                List all Contractual instruments for Scope 2
                                            </li>
                                            <li>
                                                Disclose if the residual mix is available
                                            </li>
                                            <li>
                                                Select Base Year
                                            </li>
                                            <li>
                                                Enter Significance Threshold: Default is 5%
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Operational Boundaries
                                        <ul>
                                            <li>
                                                Scope
                                            </li>
                                            <li>
                                                Generation of electricity, heat, or steam
                                            </li>
                                            <li>
                                                Physical or chemical processing
                                            </li>
                                            <li>
                                                Transportation of materials, products, waste, and employees
                                            </li>
                                            <li>
                                                Fugitive emissions
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }

    return ui();
}