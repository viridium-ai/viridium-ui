
import { Row, Col, Form, Button } from 'react-bootstrap';
import { LayoutPage } from 'components/v-layout/v-layout'
import { homeApp } from '../home-app';
import './about-us.css';
export const AboutUs = (props: any) => {
    const handleClick = () => {
        alert("Thanks for your feedback")
    }
    const ui = () => {
        return (
            <LayoutPage pageName="about-us-page" microApp={homeApp}>
                <div className="v-about-us">
                    <div className="v-mission-statement">
                        <Row>
                            <Col sm={6}>
                                <p className="mission-title">We're the data cloud for environmental sustainability</p>
                                <p className="mission-blurb">Our mission is to use data to help companies reduce their environmental impact.</p>
                            </Col>
                            <Col sm={6}>
                                <div className="mission-picture">
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="v-contact-us">
                        <Row>
                            <Col sm={9}>
                                <div className="v-container">
                                    <div className="home-header" >Contact us</div>
                                    <div className="v-summary">
                                        Tell us more about your environmental sustainability goals and challenges. <br />
                                        We'll get back to you soon!
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
                            <Col sm={3}>
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
                        <Row>
                            <Col sm={6} className="v-form-col button-container">
                                <Button onClick={handleClick}>Submit</Button>
                            </Col>
                            <Col sm={6}>
                            </Col>
                        </Row>
                    </div>
                </div>
            </LayoutPage>
        )
    }
    return ui();
}