
import { LayoutPage } from '../../components/layout'
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { homeApp } from './home-app';

export const About = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={homeApp} routeItem={{ name: '' }}>
                <div className="home-page">
                    <div className="home-header" >Company</div>
                    <Row className="home-content">
                        <Col className="home-panel">
                            <p>
                                Doner pork loin bacon, in swine ut id consectetur chicken pork dolore lorem ex biltong.
                                Est labore pariatur beef ribs tenderloin, picanha shoulder jowl rump.  In ham dolore
                                adipisicing consectetur pork loin.  Kielbasa leberkas excepteur voluptate adipisicing
                                do corned beef burgdoggen exercitation nostrud landjaeger consequat deserunt meatball.",
                                "Doner aliquip ham hock labore picanha minim qui.  Brisket pancetta occaecat, chislic enim
                                dolore flank.  Quis shoulder burgdoggen cupim beef fugiat ex minim sausage nulla leberkas qui
                                boudin.  Pork loin frankfurter officia aliqua proident et leberkas.  Jowl strip steak
                            </p>
                            <p>
                                fatback bresaola, culpa exercitation cupidatat.  Laboris ut filet mignon landjaeger.
                                Sint shoulder eiusmod, minim duis cupidatat sirloin tail in flank strip steak turkey
                                non kielbasa occaecat.","Porchetta quis ex, cow pork loin culpa flank enim in filet mignon.
                            </p>

                        </Col>
                        <Col className="home-panel" >
                            <div>
                                About
                            </div>
                            <p>
                                fatback bresaola, culpa exercitation cupidatat.  Laboris ut filet mignon landjaeger.
                                Sint shoulder eiusmod, minim duis cupidatat sirloin tail in flank strip steak turkey
                                non kielbasa occaecat.","Porchetta quis ex, cow pork loin culpa flank enim in filet mignon.
                            </p>
                        </Col>
                    </Row>
                    <Row className="home-content">
                        <Tabs defaultActiveKey="leadership" id="uncontrolled-tab-example" className="mb-3" >
                            <Tab eventKey="leadership" title="Leadership">
                                fatback bresaola, culpa exercitation cupidatat.  Laboris ut filet mignon landjaeger.
                                Sint shoulder eiusmod
                            </Tab>
                            <Tab eventKey="experts" title="Experts">
                                fatback bresaola, culpa exercitation cupidatat.  Laboris ut filet mignon landjaeger.
                                Sint shoulder eiusmod
                            </Tab>
                            <Tab eventKey="board" title="Board">
                                fatback bresaola, culpa exercitation cupidatat.  Laboris ut filet mignon landjaeger.
                                Sint shoulder eiusmod
                            </Tab>
                        </Tabs>
                    </Row>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}