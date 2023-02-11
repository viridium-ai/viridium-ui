import { LayoutPage } from '../../components/v-layout/v-layout'
import { Row, Col } from 'react-bootstrap';
import { homeApp } from './home-app';

export const Industries = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage pageName="industries-page" microApp={homeApp}>
                <div className='v-row'>
                    <Col ms={6}>
                        <div className="v-container">
                            <div className='v-list-item'> <h2>Agriculture</h2>
                           
                            </div>
                            <div className='v-list-item'><h2>Automotive</h2>

                            </div>
                            <div className='v-list-item'><h2>Energy</h2>
                            </div>

                            <div className='v-list-item'><h2>Financial services</h2>

                            </div>

                            <div className='v-list-item'><h2>Manufacturing</h2>

                            </div>
                        </div>
                    </Col>
                    <Col ms={6}>
                        <div className="mission-picture">
                        </div>
                    </Col>
                </div>
            </LayoutPage>
        )
    }
    return ui();
}