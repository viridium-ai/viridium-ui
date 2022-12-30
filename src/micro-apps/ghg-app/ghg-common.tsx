import { localCache } from "../../utils/cache-manager";
import { useState } from 'react';

import { Row, Col, Form, Table } from 'react-bootstrap';

export const updateReport = (report : InventoryReport) => {
    localCache.set("report", report);
}

export const getReport = ()  : InventoryReport => {
    return localCache.get("report", new InventoryReport())
}

export type Organization = {
    name: string,
    equityShare: number,
    hasFinancialControl: boolean,
    hasOperationalControl: boolean
}

export class Address {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    country: string;
    zipCode?: string;
    constructor(street1: string, city: string, state: string, country: string, zipCode: string) {
        this.street1 = street1;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = zipCode;
    }
}

export class Verifier {
    name: string = "";
    date?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export class Source {
    name: string = "not specified";
    type: string = "facility";
    category: string = "fuel"
}

export class InventoryItem {
    //step 1
    companyName: string = "Test";
    context: string = "Carbon";
    type: string = "Company";
    standard: string = "GHG";
    regulation: string = "Niraji";
    items : Array<string> = [];
    dataSources : Array<string> = [];
}

export class InventoryReport {
    //step 1
    companyName: string = "Test";
    reportYear: string = "2020";
    baseYear: string = "2000";
    logo: string = ""; //filename
    verified: boolean = false;
    verifiedBy?: Verifier = undefined;

    //step 2
    type: string = "Canned";
    dateFrom?: string;
    dateTo?: string;
    scope3Included: boolean = false;
    hasExclusions: boolean = false;
    exclusions: Array<Source> = [];

    operationalBoundaries: string[] = [];
    organizationalBoundaries: string[] = [];
    //step 3

    emissions: Array<Emission> = [];

    getEmissionTable = (): Array<Array<any>> => {

        return [
            [2001, 23, 21, 21, 23, 23, 42],
            [2002, 23, 21, 21, 23, 23, 42]
        ]
    }

    static newReport = (companyName: string, reportYear: string, verified: boolean, logo: string, verifiedBy: Verifier) => {
        let report = new InventoryReport();
        report.companyName = companyName;
        report.reportYear = reportYear;
        report.verified = verified;
        report.logo = logo;
        report.verifiedBy = verifiedBy;
        return report;
    }
}

export class Category {
    name: string;
    description?: string;
    parentCategory?: string;
    scope: string;
    constructor(name: string, description: string, parentCategory: string, scope: string = "1") {
        this.name = name;
        this.description = description;
        this.parentCategory = parentCategory;
        this.scope = scope;
    }
}

export const EmissionTypes = [
    "CO2", "CH4", "M2O", "HFCs", "PFCs", "SF6"
]

export class EmissionAmount {
    type: string = "";
    amount?: number;
    public static new = (type: string, amount: number | undefined = undefined) => {
        let emission = new EmissionAmount();
        emission.amount = amount;
        emission.type = type;
        return emission;
    }
}

export class Emission {
    scope: string = "1"; //scope 1; scope 2; scope 3
    //actor
    sourceType: string = "transport";
    sourceSutType?: string = "airplane"; //
    //activity
    activityType: string = "taxi"; //breath

    //gh category
    category: string = "fuel";
    subCategory?: string;
    //location
    location?: string; //country.state.county
    //time
    year: string = "2000";
    month?: string;
    //emision amount
    qualities: Array<EmissionAmount> = [];

    unit: string = "mt"; //mt; kg etc.
    constructor() {
        this.qualities = EmissionTypes.map(value => {
            return EmissionAmount.new(value, 0);
        })
    }
    static new = (sourceType: string, sourceSutType: string, scope: string, location: string, category: string, year: string) => {
        let emission = new Emission();
        emission.sourceType = sourceType;
        emission.sourceSutType = sourceSutType;
        emission.scope = scope;
        emission.location = location;
        emission.year = year;
        emission.category = category;
        return emission;
    }
}



export const AnalyticTable = (props: any) => {
    const ui = () => {
        return (
            <Table className="analytic-table">
                <thead>
                    {
                        props.headers.map((header: any, idx: number) =>
                            <th className={"analytic-col-" + idx}>{header}</th>
                        )
                    }
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </Table>
        )
    }
    return ui();
}

export const EmissionRow = (props: any) => {
    const ui = () => {
        return (
            <tr className="emission-row" >
                {
                    props.values.map((dim: any, idx: number) =>
                        <td className={idx ===0 ? "emission-year" : "emission-value"}>{dim}</td>
                    )
                }
            </tr>)
    }
    return ui();
}

export const AggregatedEmission = (props: any) => {
    const ui = () => {
        return (
            <tr className="analytic-row" >
                {
                    props.dimensions.map((dim: any, idx: number) =>
                        <td className={"analytic-dim-" + idx}>{dim}</td>
                    )
                }
                <td className="analytic-measure">
                    {props.measure}
                </td>
            </tr>)
    }
    return ui();
}

export const DateRange = (props: any) => {
    const ui = () => {
        return (
            <div className="wizard-sub-questions">
                <Row >
                    <Col>
                        <Form.Label>From</Form.Label>
                        <Form.Control type="date" placeholder="Date from" />
                    </Col>
                    <Col>
                        <Form.Label>To</Form.Label>
                        <Form.Control type="date" placeholder="Date from" />
                    </Col>
                </Row>

            </div>
        )
    }
    return ui();
}


export const OrganizationForm = (props: any) => {
    const [orgs, setOrgs] = useState<Array<Organization>>([
        {
            name: "test",
            equityShare: 80,
            hasFinancialControl: true,
            hasOperationalControl: true
        }
    ]);

    const onAdd = (evt: any) => {
        setOrgs([...orgs]);
    }

    const ui = () => {
        return (
            <div className="wizard-sub-questions">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Equity Share</th>
                            <th>Has Financial Control</th>
                            <th>Has Operational Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orgs.map((org, idx) =>
                                <tr key={"org-" + idx}>
                                    <td>{org.name}</td>
                                    <td>{org.equityShare}</td>
                                    <td>{org.hasFinancialControl}</td>
                                    <td>{org.hasOperationalControl}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table >
            </div>
        )
    }
    return ui();
}


