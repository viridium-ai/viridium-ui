import { useState, useEffect } from 'react';

import { LayoutBodyNav, LayoutPage, ViridiumOffcanvas } from '../../components/v-layout/v-layout'
import { Service } from './service-types';
import { serviceApp } from './service-app';
import { FieldDef, EntityList, EntityDetails, EntityForm } from '../../components/v-entity/entity-form';
import { restClient } from '../../components/v-common/v-client';
import { Toast } from 'react-bootstrap';
import { VscAdd } from 'react-icons/vsc';
const offline = true;
export const ServiceBrowser = (props: any) => {

    const [entities, updateEntities] = useState<any[]>([]);
    const [refreshState, updateAction] = useState(false);
    const [selectedObject, setSelected] = useState<any>();
    const [showForm, setShowForm] = useState(false);
    //the service
    const service: Service = props.service;

    useEffect(() => {
        if(!offline) {
            restClient.get(`${service.path}`).then((json) => {
                updateEntities(json);
                setSelected(undefined);
            }).catch(error => {
                console.log("error", error);
            });
        }
    }, [refreshState, service.path]);

    //schema of the service
    const schema = service.getSchema()!;
    //get field definitions of an entity
    const fieldDefs = (data: any): Array<FieldDef> => {
        return schema.getFieldDefs();
    }
    //callback when entity list is updated
    const listUpdated = () => {
        updateAction(!refreshState);
    }
    //handle delete an entity
    const handleDelete = (object: any) => {
        restClient.delete(`${service.path}/${object.id}`)
            .then((res) => {
                listUpdated();
            }).catch(error => {
                console.log("error", error);
            });
    }

    const getNavItem = () => {
        return undefined;
    }
    const onSubmit = (object: any) => {
        //create on the server
        //this.path
    }
    const handleEdit = (object: any) => {
        setSelected(object);
        setShowForm(true);
    }
    //UI 
    return (
        <div className='schema-app'>
            <LayoutPage microApp={serviceApp}>
                <div className="v-body-nav">
                    <Toast.Header className="v-header" closeButton={false}>
                        <div className="me-auto">Services</div>
                    </Toast.Header>
                    
                    <LayoutBodyNav selected={getNavItem()} routeItems={serviceApp.getNavItems().map((service) => service.toNavItem())
                    } />
                </div>
                <div className="v-body-main">
                    <div className="v-flex v-header">
                        <span className="me-auto">{service.getLabel()}</span>
                        <span onClick={()=> setShowForm(true)}><VscAdd /></span>
                    </div>
                    <EntityList view='Table' title={`${schema.getLabel()}`} entities={entities} onDelete={handleDelete}
                        onEdit={handleEdit}
                        onSelect={(res: any) => { setSelected(res) }} fieldDefs={fieldDefs}
                        actions={[
                            {
                                name: 'Add',
                                action: () => {
                                    setSelected(undefined);
                                    setShowForm(true);
                                }
                            }]}
                    />
                    {
                        selectedObject && <EntityDetails title={`${schema.name} Details`} entity={selectedObject} fieldDefs={fieldDefs} actions={[
                            {
                                name: 'Edit',
                                action: () => { setShowForm(true); }
                            }, {
                                name: 'X',
                                action: () => { setSelected(undefined); }
                            }]} />
                    }
                </div>
            </LayoutPage>
            <ViridiumOffcanvas onHide={setShowForm} showForm={showForm} title={schema.getLabel()} >
                <EntityForm inline={true} title='' entity={selectedObject ? selectedObject : schema?.getEmptyObject()}
                    onSubmit={onSubmit}
                    mode={"create"}
                    fieldDefs={fieldDefs} />
            </ViridiumOffcanvas>
        </div>)
}
