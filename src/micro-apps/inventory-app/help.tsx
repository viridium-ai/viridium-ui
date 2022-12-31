
import { Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout';
import { inventoryConfigApp } from './inventory-app';

export const Help = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} routeItem={{ name: '' }}>
                <div className="home-body">
                    <div className="home-body-nav">
                        <Toast >
                            <Toast.Body>
                                <div className="item">
                                    Current Status
                                </div>
                                <div className="item">
                                    Status YoY
                                </div >
                                <div className="item">
                                    Activities
                                </div>
                                <div className="item">
                                    Sources
                                </div>
                                <div className="item">
                                    Scope
                                </div>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="home-body-main">
                        <div className="dashboard-panel">
                        <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Help</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    Setting up inventory item
                                </Toast.Body>
                            </Toast>
                            
                        </div>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}