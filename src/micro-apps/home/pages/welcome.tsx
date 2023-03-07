import { Row, Col } from 'react-bootstrap';
import { LayoutPage } from 'components/v-layout/v-layout';
import { homeApp } from '../home-app';
import "./welcome.css"

export const WelcomePage = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage pageName="welcome-page" microApp={homeApp}>
                <Row className="home-content">
                    <Col className="home-splash">
                        <div>
                            Build a
                        </div>
                        <div>
                            greener
                        </div>
                        <div>
                            future.
                        </div>
                    </Col>
                    <Col className="home-blurb">
                        Learn how Acme reduced carbon, waste, and costs with Viridium.AI
                        <div className="v-button">
                            Watch now
                        </div>
                    </Col>
                </Row>
            </LayoutPage>
        )
    }
    return ui();
}