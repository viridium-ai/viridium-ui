
import { Row, Col, Form, Button } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout/v-layout'
import { homeApp } from './home-app';
import './contact-us.css';
export const ContactUs = (props: any) => {
    const handleClick = () => {
        alert("Thanks for your feedbback")
    }
    const ui = () => {
        return (
            <LayoutPage microApp={homeApp}>
                <div className="v-contact-us">
                    <div className="v-form">
                        <div className="home-header" >Contact US</div>
                        <div className="home-header-line" >___</div>
                        <div className="v-summary">
                            Tell us more about your environmental sustainability objectives and challenges. We will get back to you soon.
                        </div>
                        <Row className="v-form-row">
                            <Col className="v-form-col">
                                <Form.Control required={true} type="text" placeholder="Name:" />
                            </Col>
                        </Row>
                        <Row className="v-form-row">
                            <Col className="v-form-col">
                                <Form.Control required={true} type="text" placeholder="Email:" />
                            </Col>
                        </Row>
                        <Row className="v-form-row">
                            <Col className="v-form-col">
                                <Form.Control type="text" placeholder="Phone:" />
                            </Col>
                        </Row>
                        <Row className="v-form-row">
                            <Col className="v-form-col">
                                <Form.Control as="textarea" rows={3} placeholder="Tell us more:" />
                            </Col>
                        </Row>
                        <Row className="v-form-row">
                            <Col className="v-form-col button-container">
                                <Button onClick={handleClick}>Submit</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </LayoutPage>
        )
    }
    return ui();
}