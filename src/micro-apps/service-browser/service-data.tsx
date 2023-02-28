import { PureComponent } from 'react';

import { LayoutBodyNav, LayoutPage } from '../../components/v-layout/v-layout'
import { Service, ServiceSchema } from './service-types';
import { serviceApp } from './service-app';
import { FieldDef, EntityList, EntityForm } from '../../components/v-entity/entity-form';

import { Toast } from 'react-bootstrap';

interface ServiceManagerProps {
    service: Service;
}

interface ServiceManagerState {
    service: Service;
    selectedObject: any;
    refreshState: boolean;
    entities: Array<any>
}

export class ServiceManager extends PureComponent<ServiceManagerProps, ServiceManagerState> {

    schema?: ServiceSchema;
    constructor(props: ServiceManagerProps) {
        super(props);
        this.setState({ selectedObject: undefined, refreshState: false, service: props.service, entities: [] })
        this.schema = props.service.getSchema();
    }

    componentDidUpdate(prevProps: Readonly<ServiceManagerProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.service.name !== prevProps.service.name) {
            this.setState({ service: this.props.service });

        }
    }

    fieldDefs = (data: any): FieldDef[] | undefined => {
        return this.schema?.getFieldDefs();
    }
    //callback when entity list is updated
    getNavItem = () => {
        return undefined;
    }
    onSubmit = (object: any) => {
        //create on the server
        //this.path
    }
    render = () => {
        let schema = this.schema!;
        let service = this.state.service;
        let entity = this.state.selectedObject ? this.state.selectedObject : schema.getEmptyObject();
        return (
            <div className='schema-app'>
                <LayoutPage microApp={serviceApp}>
                    <div className="v-body-nav">
                        <Toast.Header className="v-header" closeButton={false}>
                            <div className="me-auto">Services</div>
                        </Toast.Header>
                        {
                            serviceApp.getGroupedNavItems().map((item) => {
                                return <div>
                                    <div className="v-title">{item.name}</div>
                                    <LayoutBodyNav selected={this.getNavItem()} routeItems={item.items.map((s) => s.toNavItem())} />
                                </div>
                            })
                        }
                    </div>
                    <div className="v-body-main">
                        <div className="v-flex v-header">
                            <span className="me-auto">{service.getLabel()}</span>
                        </div>
                        <EntityForm inline={true} title='' entity={entity}
                            onSubmit={this.onSubmit}
                            mode={"create"}
                            fieldDefs={this.fieldDefs} />
                        <EntityList view='Table' title={`${schema.getLabel()}`} entities={this.state.entities}
                            fieldDefs={this.fieldDefs} />
                    </div>
                </LayoutPage>
            </div>)
    }
}
