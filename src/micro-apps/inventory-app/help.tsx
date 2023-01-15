
import { Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout/v-layout';
import { inventoryConfigApp } from './inventory-app';

export const Help = (props: any) => {
    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} >
                <div className="v-body">
                    <div className="v-body-nav">
                        <Toast >
                            <Toast.Body className="v-list">
                                <div className="v-list-item">
                                    Current Status
                                </div>
                                <div className="v-list-item">
                                    Status YoY
                                </div >
                                <div className="v-list-item">
                                    Activities
                                </div>
                                <div className="v-list-item">
                                    Sources
                                </div>
                                <div className="v-list-item">
                                    Scope
                                </div>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="v-body-main">
                        <div className="v-dashboard-panel">
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