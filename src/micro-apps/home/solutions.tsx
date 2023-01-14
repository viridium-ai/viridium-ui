
import { Row, Col } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout'
import { homeApp } from './home-app';

export const Solutions = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={homeApp}>
                <div className="home-page">
                    <div className="home-header" >Solutions</div>
                    <Row className="home-content">
                        <Col className="home-panel">
                            Doner pork loin bacon, in swine ut id consectetur chicken pork dolore lorem ex biltong.  Est labore pariatur beef ribs tenderloin, picanha shoulder jowl rump.  In ham dolore adipisicing consectetur pork loin.   jerky.
                        </Col>
                        <Col className="home-panel" >
                            Eu spare ribs esse, aute pariatur ut magna ea fatback voluptate tongue corned beef qui.  Chislic pastrami sint pork loin anim
                        </Col>
                        <Col className="home-panel" >
                            Tongue commodo kevin burgdoggen nisi eiusmod.  Rump pork belly veniam picanha nisi mollit, shank laboris.  Bresaola pancetta ut
                        </Col>
                    </Row>
                </div>
            </LayoutPage>
        )
    }
    return ui();
}