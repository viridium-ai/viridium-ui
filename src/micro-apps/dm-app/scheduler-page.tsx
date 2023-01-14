import { Row, Col, Toast, Stack, Form, Container } from 'react-bootstrap';
import { LayoutPage} from '../../components/v-layout';
import { dataSourceManager } from './dm-app';

export const SchedulerPage = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} >
                    <div className="v-body-nav">
                        <Toast >
                            <Toast.Body>
                                <div className="item">
                                    Planning Workspace
                                </div>
                                <div className="item">
                                    Net Zero Planning
                                </div >
                                <div className="item">
                                    Population Planning
                                </div>
                                <div className="item">
                                    Policy Planning
                                </div>
                                <div className="item">
                                    Supplier Planning
                                </div>
                                <div className="item">
                                    Source Planning
                                </div>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="v-body-main">
                        <div className="dashboard-panel">
                            <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Credit Goals/Targets</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Row className="test-ok">
                                        <Col   >
                                            Enterprise Wide
                                        </Col>
                                        <Col  >
                                            Progress/Activity Goal
                                        </Col>
                                        <Col  >
                                            Regulation Goal
                                        </Col>
                                        <Col  >
                                            Policy Goal
                                        </Col>
                                        <Col  >
                                            Product Pool
                                        </Col>
                                    </Row>

                                </Toast.Body>
                            </Toast>
                        </div>
                        <div className="dashboard-panel">
                            <Stack direction="horizontal" gap={3}>
                                <div >Select a Template (optional)</div>
                                <div className="ms-auto"></div>
                                <div className="ms-end">
                                    <Form.Select aria-label="Default select example">
                                        <option>Select a type</option>
                                        <option value="1">Transportation</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="vr" />
                                <div className="ms-end">
                                    <Form.Select aria-label="Default select example">
                                        <option>Select a source</option>
                                        <option value="1">Air flight</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></div>
                                <div className="vr" />
                                <div >Preview template</div>
                            </Stack>
                        </div>
                        <div className="dashboard-panel">
                            <Container >
                                <Row>
                                    <Col sm={3}>Goal</Col>
                                    <Col sm={9}>Net zero by 2030</Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>Target type and details</Col>
                                    <Col sm={9}>
                                        <div className="target-details">
                                            ongue commodo kevin burgdoggen nisi eiusmod. Rump pork belly veniam picanha nisi mollit, shank laboris. Bresaola pancetta ut sirloin, nulla strip steak esse bacon consequat officia spare ribs. Boudin ad pork belly voluptate, jerky ullamco officia.","Veniam boudin cow, magna bacon cupim dolore tail nostrud dolor tempor cupidatat consequat tri-tip. Pastrami enim boudin, minim sint andouille excepteur non. Doner beef strip steak jowl meatball cupim sausage picanha in. Boudin esse dolore ut. Pork loin tempor velit dolore salami, kevin nulla beef ribs tongue shank veniam in.","Consectetur biltong ball tip prosciutto mollit short loin shankle t-bone. In short loin cillum turkey mollit esse, excepteur andouille tongue kevin magna swine culpa. Pariatur alcatra chicken, anim consectetur culpa deserunt ut drumstick ball tip buffalo pastrami leberkas in. Tail biltong ball tip t-bone meatball, tenderloin drumstick reprehenderit pork chop shankle shoulder. Ribeye short loin cillum dolore aute minim consequat shoulder. Picanha pancetta tail dolor enim leberkas proident.","Irure in landjaeger minim pork chislic ribeye buffalo. Aute biltong drumstick, jerky ut brisket t-bone laborum shankle kielbasa. Doner strip steak in ut exercitation flank deserunt officia aute in landjaeger ribeye adipisicing labore occaecat. Jowl tempor cillum corned beef filet mignon aliqua venison ex ad flank. Landjaeger voluptate shoulder culpa. Corned beef picanha dolor drumstick. Meatloaf ex frankfurter, leberkas cupidatat cillum aliqua exercitation shankle pork flank.","Picanha consectetur voluptate leberkas pancetta meatloaf in do cupidatat filet mignon exercitation ham hock. Do sunt porchetta beef ribs commodo swine chislic ut cupim biltong alcatra landjaeger incididunt. Cupidatat bresaola sirloin laborum sunt dolore
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>Map Stake Holders vs Goals</Col>
                                    <Col sm={9}>                                         <Row>
                                        <Col>

                                        </Col>
                                        <Col>

                                        </Col>
                                    </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>View and edit plan</Col>
                                    <Col sm={9}>Prgoress Bar</Col>
                                </Row>

                            </Container>
                        </div>
                    </div>
            </LayoutPage >
        )
    }
    return ui();
}