
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

         
                <Row >
                    <Col sm={6}>
                        <div className="v-form">
                            <div className="home-header" >Contact us</div>
                            <div className="v-summary">
                                Tell us more about your environmental sustainability objectives and challenges. We will get back to you soon.
                            </div>
                            <Row className="v-form-row">
                                <Col className="v-form-col">
                                    <Form.Control required={true} type="text" placeholder="Your name" />
                                </Col>
                            </Row>
                            <Row className="v-form-row">
                                <Col className="v-form-col">
                                    <Form.Control required={true} type="text" placeholder="Your email" />
                                </Col>
                            </Row>
                            <Row className="v-form-row">
                                <Col className="v-form-col">
                                    <Form.Control type="text" placeholder="Phone number" />
                                </Col>
                            </Row>
                            <Row className="v-form-row">
                                <Col className="v-form-col">
                                    <Form.Control as="textarea" rows={5} placeholder="Tell us more:" />
                                </Col>
                            </Row>

                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="contact">
                            <div className="contact-1">
                                General inquiries
                                <p>contact@viridium.ai</p>
                            </div>
                            <div className="contact-2">
                                Press & Media
                                <p> press@viridium.ai</p>
                            </div>
                            <div className="contact-3">
                                Location
                                <p>1234 Viridium Street <br />
                                    Green Island <br />
                                    CA 94115 <br />USA</p>
                            </div>
                        </div>

                    </Col>
                </Row>
                <Row  >

                    <Col sm={6} className="v-form-col button-container">
                        <Button onClick={handleClick}>Submit</Button>
                    </Col>


                    <Col sm={6}> 
                    </Col>
                </Row>   
            </div>
            </LayoutPage>
        )
    }
    return ui();
}