import { Row, Col } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout/v-layout';
import { homeApp } from './home-app';
import "./welcome.css"

export const WelcomePage = (props: any) => {
    homeApp.getPageClass = () => "welcome-page";
    const ui = () => {
        return (
            <LayoutPage microApp={homeApp}>
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
                        Learn how Acme creates the best personalized carbon report with the Viridium Data Cloud.
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