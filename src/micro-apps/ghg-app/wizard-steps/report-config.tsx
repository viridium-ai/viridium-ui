import { useState } from "react";
import { Question, Action } from "../../../common/wizard";
import { Toast, Form } from "react-bootstrap";
import { LayoutPage } from "../../../common/layout";
import { greenHouseApp } from "../ghg-app";
import { InventoryReport, getReport, DateRange, updateReport } from "../ghg-common";

export const ReportConfig = (props: any) => {
    const [report, setReport] = useState<InventoryReport>(getReport());
    const [excluded, setExcluded] = useState<boolean>(false);
    const handleReportTypeChanged = (evt: any) => {
        let clone = { ...report };
        clone.type = evt.target.value;
        setReport(clone);
    }
    const handleScope3Changed = (evt: any) => {
        let clone = { ...report };
        clone.scope3Included = evt.target.checked;
        setReport(clone);
    }
    const handleExcludeChanged = (evt: any) => {
        setExcluded(evt.target.checked);
    }

    const handleRangeChange = (from: string, to: string) => {

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
                                <strong className="me-auto">Reporting</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Question label="Type of Report">
                                    <Form.Select onChange={handleReportTypeChanged}
                                        aria-label="Type of reports" value={report.type}>
                                        <option>Select a type</option>
                                        <option value="Custom">Custom</option>
                                        <option value="Canned">Canned</option>
                                    </Form.Select>
                                    {
                                        report.type === "Canned" ? (<DateRange range={{ from: report.dateFrom, to: report.dateTo }} onRangeChange={handleRangeChange} />) : ("")
                                    }
                                </Question>
                                <Question label="Have any facilities, operations and/or emissions sources been excluded from this inventory?">
                                    <Form.Check
                                        className="wizard-checkbox"
                                        type="checkbox"
                                        id={`verified-by`}
                                        checked={excluded}
                                        onChange={handleExcludeChanged}
                                    />
                                    {
                                        excluded ? (
                                            <Form.Group className="mb-3" controlId="formDataDesc">
                                                <Form.Control as="textarea" rows={3} />
                                            </Form.Group>)
                                            : ("")
                                    }
                                </Question>
                                <Question label="Scope 3 Included">
                                    <Form.Check
                                        type="checkbox"
                                        className="wizard-checkbox"
                                        id={`scope-3-included`}
                                        checked={report.scope3Included}
                                        onChange={handleScope3Changed}
                                    />
                                </Question>
                                <Question label="Organizational Boundaries" className="mb-3">
                                        <Form.Check
                                            inline
                                            className="wizard-checkbox"
                                            label="Equity Share"
                                            name="org"
                                            type="radio"
                                            id={`inline-radio-1`}
                                        />
                                        <Form.Check
                                            inline
                                            className="wizard-checkbox"
                                            label="Financial Control"
                                            name="org"
                                            type="radio"
                                            id={`inline-radio-2`}
                                        />
                                        <Form.Check
                                            inline
                                            className="wizard-checkbox"
                                            label="Operational Control"
                                            type="radio"
                                            name="org"
                                            id={`inline-radio-3`}
                                        />
                                     
                                </Question>
                                <Question label="Operational Boundaries">
                                    <Form.Control as="textarea" rows={3} />
                                </Question>
                                <Action onNext={onNext} next={{ label: "Next", path: "/wizard/3" }} prev={{ label: "Back", path: "/wizard/1" }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="wizard-body-help">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Help for Reporting</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <ul>
                                    <li>Provide a report selection option with Custom or Canned Reports
                                    </li>
                                    <li>This is a Canned report per GHG Standards
                                        <ul>
                                            <li>
                                                User Enters Date Range From and To (MM/DD/YYYY)
                                            </li>
                                            <li>
                                                If Verified by an accredited third party, their details
                                                <ul>
                                                    <li>Date of verification: MM/DD/YYYY</li>
                                                    <li>Verifier Name</li>
                                                    <li>Email</li>
                                                    <li>Phone</li>
                                                    <li>Address</li>
                                                </ul>
                                            </li>

                                        </ul>
                                    </li>
                                    <li>Whether scope 3 was included Y/N</li>
                                    <li>
                                        Downloadable Sample GHG Reports
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