import { Component, useState } from "react";
import { Toast, Form, Button, Col, Row, Offcanvas } from "react-bootstrap";
import { LayoutPage, ViridiumOffcanvas } from "../../../components/layout";
import { Action } from "../../../components/wizard";
import { greenHouseApp } from "../ghg-app";
import { Emission, EmissionTypes, InventoryReport, getReport, AnalyticTable, EmissionRow } from "../ghg-common";

export const Scope3Categories = [
    "Purchased goods and services",
    "Capital goods",
    "Fuel- and energy-related activities",
    "Transportation and distribution",
    "Waste generated in operations",
    "Business travel",
    "Employee commuting",
    "Leased assets",
    "Processing of sold products",
    "Use of sold products",
    "End of life treatment of sold products",
    "Franchises",
    "Investments"
]

type EmissionFormProp = {
    onCreate?: Function
    year?: string
}
type EmissionFormState = {
    emission: Emission
}
class EmissionForm extends Component<EmissionFormProp, EmissionFormState>{
    constructor(props: EmissionFormProp) {
        super(props);
        this.state = {
            emission: new Emission()
        };
    }
    componentDidMount() {

    }

    componentDidUpdate() {

    }
    handleEmissionChanged = (evt: any) => {
        console.log(evt);
        //setScope(evt.target.value);
    }
    onSelect = (evt: any) => {
        console.log(evt);
        //setScope(evt.target.value);
    }
    onSave = (evt: any) => {
        if (this.props.onCreate) {
            this.props.onCreate(this.state.emission);
        }
    }

    render() {
        let emission = this.state.emission;
        return (

            <div className="wizard-sub-questions">
                <div className="form-help-text">
                    Emission data based on type of activities for your company.
                </div>

                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="total">
                        <Form.Label column sm="4">Scope</Form.Label>
                        <Col sm="8">
                            <Form.Select onChange={this.onSelect} value={emission.scope} aria-label="Default Scope">
                                <option value="1">Scope 1</option>
                                <option value="2">Scope 2</option>
                                <option value="3">Scope 3 (Optional)</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="total">
                        <Form.Label column sm="4">Source Type</Form.Label>
                        <Col sm="8">
                            <Form.Select onChange={this.onSelect} value={emission.sourceType} aria-label="Default Scope">
                                <option value="Facility">Facility</option>
                                <option value="Car">Car</option>
                                <option value="Airplane">Airplane</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="total">
                        <Form.Label column sm="4">Activity</Form.Label>
                        <Col sm="8">
                            <Form.Select onChange={this.onSelect} value={emission.activityType} aria-label="Default Scope">
                                <option value="1">Taxing</option>
                                <option value="2">Flying</option>
                                <option value="3">Idle</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="total">
                        <Form.Label column sm="4">Category</Form.Label>
                        <Col sm="8">
                            <Form.Select onChange={this.onSelect} value={emission.category} aria-label="Default Scope">
                                {
                                    Scope3Categories.map((name, idx) => <option value={idx}>{name}</option>)
                                }
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    {
                        emission.qualities.map((q: any) =>
                            <Form.Group as={Row} className="mb-3" controlId="co2">
                                <Form.Label column sm="4">{q.type}</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" onChange={this.handleEmissionChanged}
                                        value={q.amount} placeholder={q.type} />
                                </Col>
                            </Form.Group>
                        )
                    }
                    <Form.Group className="mb-3 form-actions" controlId="formButtons">
                        <Button className="form-action" onClick={this.onSave} >
                            Save
                        </Button>
                    </Form.Group>
                </Form>
            </div>

        )
    }
}
export const EmissionUpload = (props: any) => {
    const [scope] = useState("3");
    const onSelect = (evt: any) => {
        //setScope(evt.target.value);
    }

    const onUpload = (evt: any) => {

    }
    const ui = () => {
        return (
            <div className="wizard-sub-questions">
                <div className="form-help-text">
                    Please select a file contains emission data, for the format of the file, please refer to <a href="/sample-emission.json">sample file</a>
                </div>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="scope">
                        <Form.Label column sm="4">Scope</Form.Label>
                        <Col sm="8">
                            <Form.Select onChange={onSelect} value={scope} aria-label="Default Scope">
                                <option value="1">Scope 1</option>
                                <option value="2">Scope 2</option>
                                <option value="3">Scope 3 (Optional)</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="emissionFile">
                        <Form.Label column sm="4">Select your file</Form.Label>
                        <Col sm="8">
                            <Form.Control type="file" placeholder="drop your emission file" />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3 form-actions" controlId="formButtons">
                        <Button className="form-action" onClick={onUpload} >
                            Upload
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    return ui();
}

const renderLinks = (actions: Array<any>) => {
    return (
        actions?.map((a: any, idx: number) => {
            return <span key={idx.toString()} onClick={(e) => {
                a.action!();
            }} className='component-action'>{a.name}</span>
        })
    )
}

export const EmissionData = (props: any) => {
    const [report] = useState<InventoryReport>(getReport());
    const [showForm, setShowForm] = useState({ show: false, mode: 'create' });
    const [showUpload, setShowUpload] = useState({ show: false, mode: 'create' });

    const handleCreate = (emission: Emission) => {
        console.log(emission);
    }
    const updateReport = () => {

    }
    const ui = () => {
        let reportObject = new InventoryReport();
        Object.assign(reportObject, report);
        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                <div>
                    <LayoutPage microApp={greenHouseApp} >
                        <div className="wizard-body">
                            <div className="wizard-body-main emission-table">
                                <Toast >
                                    <Toast.Header closeButton={false}>
                                        <strong className="me-auto">Emission Data</strong>
                                        {renderLinks([
                                            { name: "Upload", action: () => { setShowUpload({ show: true, mode: 'create' }) } },
                                            { name: "Add", action: () => { setShowForm({ show: true, mode: 'create' }) } }
                                        ])}
                                    </Toast.Header>
                                    <Toast.Body>
                                        <AnalyticTable title="Emission by country" headers={["Year", ...EmissionTypes]}>
                                            {
                                                reportObject.getEmissionTable().map((row) => <EmissionRow values={row} />)
                                            }
                                        </AnalyticTable>
                                        <Action onNext={updateReport} next={{ label: "Next", path: "/wizard/4" }} prev={{ label: "Back", path: "/wizard/2" }} />
                                    </Toast.Body>
                                </Toast>
                            </div>
                            <div className="wizard-body-help">
                                <Toast >
                                    <Toast.Header closeButton={false}>
                                        <strong className="me-auto">Help for Data Management</strong>
                                    </Toast.Header>
                                    <Toast.Body>
                                        The table refers to emissions independent of any GHG trades such as sales,
                                        purchases, transfers, or banking of allowances
                                    </Toast.Body>
                                </Toast>
                            </div>
                        </div>
                    </LayoutPage >
                </div>
                <ViridiumOffcanvas onHide={setShowForm} showForm={showForm} title={`Emission Activity`} >
                    <EmissionForm onCreate={handleCreate} />
                </ViridiumOffcanvas>
                <ViridiumOffcanvas onHide={setShowUpload} showForm={showUpload} title={`Upload Emission Activities`} >
                    <EmissionUpload onCreate={handleCreate} />
                </ViridiumOffcanvas>
            </LayoutPage>
        )
    }
    return ui();
}
