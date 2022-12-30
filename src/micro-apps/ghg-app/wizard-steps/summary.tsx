import { Component } from 'react';

import { Toast, Form, Button } from 'react-bootstrap';
import { LayoutPage } from '../../../common/layout';
import { greenHouseApp } from '../ghg-app';


export class GreenHouseWizard extends Component {

    render = () => {
        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Green House Gas Report</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <div className="wizard-summary">
                                    To showcase the core capabilities of the data cloud (i.e., Data Management and Marketplace).
                                    Data Cloud is a platform that will take a longer-term to build. However, this app can highlight
                                    the use of the platform for applications such as generating an emissions report.
                                </div>

                                <div className="wizard-question">
                                    <Form.Group className="mb-3" controlId="formButtons">
                                        <Button variant="primary" href="/wizard/1">Start</Button>
                                    </Form.Group>
                                </div>

                                <div className="wizard-question">
                                    <a target="_blank" href="https://ghgprotocol.org/sites/default/files/standards_supporting/Sample%20Product%20Standard%20GHG%20Inventory%20Reporting%20Template.pdf" rel="noreferrer">Template this wizard is based on</a>
                                </div>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="wizard-body-help">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Help</strong>
                            </Toast.Header>
                            <Toast.Body>
                                To showcase the core capabilities of the data cloud (i.e., Data Management and Marketplace).
                                Data Cloud is a platform that will take a longer-term to build. However, this app can highlight
                                the use of the platform for applications such as generating an emissions report.
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
}
