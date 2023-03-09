import { Component } from 'react';
import { ViridiumOffcanvas } from '../v-layout/v-layout';
import { Entity, EntityManager } from './entity-model';
import { EntityForm } from './entity-form';
import { StringUtils } from '../v-utils/v-string-utils';
import ViridiumTable from '../v-table/v-table';
interface EntityPageProps {
    manager: EntityManager<Entity>;
    mode?: "readOnly" | "create" | "update" | "delete";
    onSelect?: Function;
    closeOnSubmit?: boolean;
    emptyListMsg?: string
}
interface EntityPageState {
    entity?: Entity;
    entities?: Array<Entity>,
    showForm: boolean,
    editorMode: "readOnly" | "create" | "update" | "delete";
}
export class EntityPage extends Component<EntityPageProps, EntityPageState> {
    constructor(props: EntityPageProps) {
        super(props);
        this.state = {
            entity: undefined, entities: this.props.manager.get()
            , showForm: false, editorMode: props.mode ? props.mode : "create"
        };
    }
    hideForm = () => {
        let state = { ...this.state };
        state.showForm = false;
        this.setState(state);
    }
    showForm = () => {
        let state = { ...this.state };
        state.showForm = true;
        this.setState(state);
        this.forceUpdate();
    }
    onSubmit = (formData: any) => {
        if (this.state.editorMode === "create") {
            this.props.manager.add(formData);
        } else {
            this.props.manager.update(formData);
        }
        if (this.props.closeOnSubmit) {
            this.setState({ entities: this.props.manager.get(), showForm: false });
        } else {
            this.setState({ entities: this.props.manager.get() });
        }
    }
    onDelete = (entity: any) => {
        if (entity) {
            this.props.manager.delete(entity.id);
            this.setState({ entities: this.props.manager.get() });
        }
    }
    onSelect = (id: any, entity: any, target: any) => {
        if (entity) {
            this.props.manager.select(entity.id);
            if (this.props.onSelect) {
                this.props.onSelect(entity);
            }
        } else {
            this.props.manager.select("");
        }
    }
    onEdit = (entity: any) => {
        this.setState({ entity: entity, showForm: true, editorMode: "update" });
        this.forceUpdate();
    }
    onCreate = () => {
        this.setState({ entity: this.props.manager.defaultEntity(), showForm: true, editorMode: "create" });
        this.forceUpdate();
    }
    render = () => {
        let manager = this.props.manager;
        let canEdit = manager.getPermissions().includes("update");
        let canDelete = manager.getPermissions().includes("delete");
        let canSelect = manager.getPermissions().includes("select");
        let entityName = StringUtils.t(this.props.manager.name())?.toLocaleLowerCase();
        return (
            <>
                <div id="wrap" className="v-container">
                    {
                        this.state.entities && this.state.entities.length > 0 ?
                            <ViridiumTable
                                onSelect={canSelect ? this.onSelect : undefined}
                                onEdit={canEdit ? this.onEdit : undefined}
                                onDelete={canDelete ? this.onDelete : undefined}
                                rows={this.state.entities}
                                fieldDefs={this.props.manager.getFieldDefs}
                                title={this.props.manager.name()}
                            />
                            :
                            <div className="v-message">
                                {this.props.emptyListMsg ? this.props.emptyListMsg : <span>
                                    No {entityName} yet
                                </span>}
                                {this.props.mode === "readOnly" ? ", this data can not be added from this page" : ", click button below to add some"}
                            </div>
                    }
                </div>
                {
                    this.props.mode === "readOnly" ? "" : <span className="v-link" onClick={this.onCreate}>Add a {entityName}</span>
                }
                <ViridiumOffcanvas showTitle={false} onHide={this.hideForm} showForm={this.state.showForm} title={"Add a " + entityName} >
                    <EntityForm title="" onSubmit={this.onSubmit} entity={this.state.entity} fieldDefs={this.props.manager.getFieldDefs} mode={this.state.editorMode} />
                </ViridiumOffcanvas>
            </>
        );
    }
}
