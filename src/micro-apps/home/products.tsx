
import { Col, Row } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout/v-layout'
import { homeApp } from './home-app';

export const Products = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage pageName="products-page" microApp={homeApp}>
                <div className="v-row">
                    <Col>
                        <div className="v-container">
                            <div className='v-list-item'>
                                <h2>Data storage and management</h2>
                                Offer solutions for securely storing, organizing, and managing large amounts
                                of data, with features such as backup and recovery, data privacy, and
                                data access controls.
                            </div>
                            <div className='v-list-item'>
                                <h2>Data integration and migration</h2>
                                Provide services to help organizations integrate their data from multiple sources,
                                as well as migrate their data to a new platform.
                            </div>
                            <div className='v-list-item'>
                                <h2> Data analytics</h2>
                                Develop tools and platforms for data visualization, data analysis,
                                and data modeling, with features such as machine learning, predictive analytics, and real-time data streaming.

                            </div>
                            <div className='v-list-item'>
                                <h2> Business intelligence</h2>
                                Offer solutions for decision-making, such as reporting, dashboarding,
                                and interactive data exploration.

                            </div>
                            <div className='v-list-item'>
                                <h2>Cloud services</h2>
                                Provide cloud-based data storage and processing services, allowing organizations to
                                access their data from anywhere and scale their resources as needed.

                            </div>

                            <div className='v-list-item'>
                                <h2>Customer support and training</h2>
                                Provide comprehensive customer support, as well as training and education,
                                to help organizations effectively use your data platform.
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="mission-picture">
                        </div>
                    </Col>
                </div>
            </LayoutPage>
        )
    }
    return ui();
}