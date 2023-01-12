
import { Component } from "react";

import { Toast, Row, Col, Button } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { getConfigs } from "../../../config/viridium-config";
import { inventoryConfigApp } from "../../inventory-app/inventory-app";
import { greenHouseApp } from "../ghg-app";
import { Company, Site } from "./model";

type AddressViewProps = {
    site: any,
}
type AddressViewState = {
    site: any,
}
export class AddressView extends Component<AddressViewProps, AddressViewState> {
    render = () => {
        return <div>Address form here</div>
    }
}

type CompanySitesProps = {
    company: any,
}

export class CompanySites extends Component<CompanySitesProps, AddressViewState> {
    company: Company;
    constructor(props: CompanySitesProps) {
        super(props);
        this.company = props.company;
        this.state = { site: new Site() }
    }

    onAdd = (evt: any) => {
      
    }

    render = () => {
        const configs = getConfigs();
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >

                <div className="v-body">
                    <div className="v-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <span className="me-auto">
                                    {this.company?.name}
                                </span>
                                Viridium Industry:   {this.company?.industry}
                            </Toast.Header>
                            <Toast.Body>
                                <Row>
                                    <Col className="v-summary">
                                        Name
                                    </Col>
                                    <Col className="v-summary">

                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="v-summary">
                                        Location
                                    </Col>
                                    <Col className="v-summary">
                                        <AddressView site={this.state.site} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="v-title">
                                        Select Data Source Based on your knowledge of the Account
                                    </Col>
                                </Row>
                                
                                <Button onClick={this.onAdd} >Add</Button>
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
}

type CompanyProps = {

}

type CompanyState = {
    company: Company;
}
export class CompanyView extends Component<CompanyProps, CompanyState> {

    constructor(props: CompanySitesProps) {
        super(props);
        this.state = { company: new Company() }
    }

    onAdd = (evt: any) => {

    }

    render = () => {
        const configs = getConfigs();
        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >

                <div className="v-body">
                    <div className="v-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <span className="me-auto">
                                    Add a Company
                                </span>

                            </Toast.Header>
                            <Toast.Body>
                                <Row>
                                    <Col className="v-summary">
                                        Name
                                    </Col>
                                    <Col className="v-summary">

                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="v-summary">
                                        Location
                                    </Col>
                                    <Col className="v-summary">
                                        <AddressView site={this.state.company} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="scope-category-box">

                                        <div className="scope-category-content">

                                        </div>
                                    </Col>
                                    <Col className="scope-category-box">


                                    </Col>
                                </Row>
                                <Button onClick={this.onAdd} >Add</Button>
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
}