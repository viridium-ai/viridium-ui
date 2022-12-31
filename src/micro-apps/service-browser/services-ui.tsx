import { useState, useEffect } from 'react';

import { restClient } from "../../common/rest-client"
import { EntityList, EntityDetails, EntityForm } from './service-component';
import { LayoutPage, ViridiumOffcanvas } from '../../components/layout'
import { Service, FieldDefinition } from './schema-types';
import { schemaApp } from './schema-micro-app';

export const HomePage = (props: any) => {
    return (
        <div className='schema-app'>
            <div>Loading schema...</div>
        </div>)
}

export const SchemaBrowser = (props: any) => {

    const [entities, updateEntities] = useState<any[]>([]);
    const [refreshState, updateAction] = useState(false);
    const [selectedObject, setSelected] = useState<any>();

    const [showForm, setShowForm] = useState({ show: false, mode: 'create' });

    //the service
    const service: Service = props.service;

    useEffect(() => {
        restClient.get(`${service.path}`).then((json) => {
            updateEntities(json);
            setSelected(undefined);
        }).catch(error => {
            console.log("error", error);
        });
    }, [refreshState, service.path]);

    //schema of the service
    const schema = service.getSchema()!;
    //get field definitions of an entity
    const fieldDefs = (data: any): Array<FieldDefinition> => {
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

    const handleEdit = (object: any) => {
        setSelected(object);
        setShowForm({ show: true, mode: 'edit' });
    }
    //UI 
    return (
        <div className='schema-app'>
            <LayoutPage microApp={schemaApp} routeItem={service}>
                <EntityList view='Table' title={`${schema.getLabel()}`} entities={entities} onDelete={handleDelete}
                    onEdit={handleEdit}
                    onSelect={(res: any) => { setSelected(res) }} fieldDefs={fieldDefs}
                    actions={[
                        {
                            name: 'Add',
                            action: () => {
                                setSelected(undefined);
                                setShowForm({ show: true, mode: 'create' });
                            }
                        }]}
                />
                {
                    selectedObject && <EntityDetails title={`${schema.name} Details`} entity={selectedObject} fieldDefs={fieldDefs} actions={[
                        {
                            name: 'Edit',
                            action: () => { setShowForm({ show: true, mode: 'edit' }); }
                        }, {
                            name: 'X',
                            action: () => { setSelected(undefined); }
                        }]} />
                }
            </LayoutPage>
            <ViridiumOffcanvas onHide={setShowForm} showForm={showForm} title={schema.getLabel()} >
                <EntityForm title='' entity={selectedObject ? selectedObject : schema?.getEmptyObject()}
                    listUpdated={listUpdated}
                    path={service.path!}
                    mode={showForm.mode}
                    fieldDefs={fieldDefs} />
            </ViridiumOffcanvas>
        </div>)
}
