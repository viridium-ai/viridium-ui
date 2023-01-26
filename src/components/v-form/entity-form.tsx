import { Component } from 'react';
import { Form, Button, Container, Row, Table, Col, Toast, ToastContainer } from 'react-bootstrap';

import './entity-form.css';
import { TitleProp, Action } from '../../common/v-app';
import { StringUtils } from '../../utils/v-string-utils';

export class FieldValue {
    value: any = undefined;
    definition?: FieldDefinition;
}

export class FieldDefinition {
    name: string = '';
    type: string = '';
    format?: Function | string;
    label: string = '';
    placeHolder: string = '';
    readonly?: boolean = false;
    updatable?: boolean;
    required?: boolean = false;

    validator?: Function;
    options?: Function | Array<any>;

    public value = (value: any) => {
        return {
            value: value,
            definition: this
        } as FieldValue;
    }

    public getLabel = () => {
        return StringUtils.t(this.name);
    }

    public getPlaceHolder = () => {
        return this.placeHolder === '' ? this.getLabel() : this.placeHolder;
    }

    public getType = () => {
        return (this.type === 'string' && this.format === 'date-time') ? 'date' : this.type;
    }

    public static new(name: string, type: string, label = '', placeHolder = '', readonly = false, validator: Function | undefined = undefined) {
        let field = new FieldDefinition();
        field.name = name;
        field.type = type;
        field.label = label;
        field.placeHolder = placeHolder;
        field.readonly = readonly;
        field.validator = validator;
        return field;
    }
    public static options(name: string, label = '', placeHolder = '', options: Function | Array<any>) {
        let field = new FieldDefinition();
        field.name = name;
        field.type = "lov";
        field.label = label;
        field.placeHolder = placeHolder;
        field.options = options;
        return field;
    }
}

export class Title extends Component<TitleProp> {
    renderLinks = () => {
        const actions = this.props.actions ? this.props.actions : []
        return (
            actions?.map((a: Action, idx: number) => {
                return <span key={idx.toString()} onClick={(e) => {
                    a.action!();
                }} className='component-action'>{a.name}</span>
            })
        );
    }
    render() {
        return (
            <Row>
                <div className='panel-header'>
                    <Row>
                        <Col sm={8}>
                            <div className='component-title'> {this.props.title} </div>
                        </Col>
                        <Col sm={4}>
                            <div className='component-actions'>
                                {this.renderLinks()}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Row>
        )
    }
}

const entityToArray = (entity: any, path: string = ""): Array<any> => {
    try {
        let fieldDefs = Object.keys(entity).map(key => {
            let value = entity[key];
            let name = path !== "" ? path + "." + key : key;
            if (value instanceof Object) {
                return entityToArray(value, key);
            }
            return FieldDefinition.new(name, typeof value);
        });
        return fieldDefs.filter((d) => !(d instanceof Array));
    } catch (error) {
        console.error(entity, path);
        return [];
    }
    
}

export type FormFieldOption = {
    name: string;
    value: string;
    label: string;
}
export interface FormFieldProp {
    value: FieldValue,
    onInput: any,
    options?: Function | Array<FormFieldOption>
}
export interface FormFieldState {
    value: any,
}

export class FormField extends Component<FormFieldProp, FormFieldState>{
    constructor(props: FormFieldProp) {
        super(props);
        this.state = { value: props.value.value };

    }
    onChange = (evt: any) => {
        this.props.onInput(evt);
    }
    render() {
        let props = this.props as FormFieldProp;
        let fieldValue = props.value;
        let def = fieldValue.definition!;
        return (
            <Form.Group className="mb-3" controlId={def.getLabel()}>
                <Form.Label>{def.getLabel()}</Form.Label>
                {def.required ?
                    <Form.Control type={def.getType()} required
                        value={this.state.value}
                        onInput={this.onChange}
                        placeholder={def.getPlaceHolder()} /> :
                    <Form.Control type={def.getType()}
                        value={this.state.value}
                        onInput={this.onChange}
                        placeholder={def.getPlaceHolder()} />
                }
            </Form.Group>
        )
    }
}
export class SelectField extends Component<FormFieldProp>{

    getOptions = () => {
        let options = this.props.options;
        if (options instanceof Function) {
            return options();
        } else if (options instanceof Array<FormFieldOption>) {
            return options;
        }
    }
    render() {
        let fieldValue = this.props.value;
        let def = fieldValue.definition!;

        return (
            <Form.Group className="mb-3" controlId={def.getLabel()}>
                <Form.Label>{def.getLabel()}</Form.Label>
                <Form.Select value={fieldValue.value} onInput={this.props.onInput}>
                    {this.getOptions().map((opt: any, idx: number) => <option key={'opt' + idx} value={opt.value}>{opt.label}</option>)}
                </Form.Select>
            </Form.Group>
        )
    }
}
interface FormProp {
    title: string,
    listUpdated: Function;
    entity?: any;
    mode: string;
    fieldDefs?: Function;
    onSubmit?: Function;
}


export class EntityForm extends Component<FormProp> {
    listUpdated: Function;
    messageForm: any;
    constructor(props: FormProp) {
        super(props)
        this.listUpdated = props.listUpdated;
        this.state = { ...props.entity };
    }

    onReset = (event: any) => {
        this.setState({ ...this.props.entity });
        this.messageForm?.reset();
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        let entity = { ...this.state } as any;
        if (entity && this.props.onSubmit) {
            this.onReset(event);
            this.props.onSubmit(entity);
        } else {
            console.log('Can not add a new entity')
        }
    }

    onUpdateState = (state: any) => {
        this.setState({ ...state });
    }

    renderFields = () => {
        let newState: any = this.state;

        let fieldDefs = entityToArray(newState);

        if (this.props.fieldDefs) {
            fieldDefs = this.props.fieldDefs();
        }

        return (
            fieldDefs.filter((def: FieldDefinition) => !def.readonly)
                .map((def: FieldDefinition, idx: number) => {
                    let value = newState[def.name];
                    return (
                        'lov' === def.type ?
                            <SelectField key={idx.toString()} value={def.value(value)} onInput={(e: any) => {
                                newState[def.name] = e.target.value;
                                this.setState({ ...newState });
                            }}
                                options={def.options} /> :
                            <FormField key={idx.toString()} value={def.value(value)} onInput={(e: any) => {
                                newState[def.name] = e.target.value;
                                this.setState({ ...newState });
                            }} />
                    )
                })
        )
    }

    render() {
        return (
            <Container className="v-container">
                <Title title={this.props.title} />
                <Row>
                    <Form ref={(form: any) => this.messageForm = form} onSubmit={this.onSubmit}>
                        {this.renderFields()}
                        <Form.Group className='v-buttons'>
                            <Button variant="primary" type="submit">
                                {this.props.mode === 'create' ? 'Add' : 'Update'}
                            </Button>{' '}
                            <Button variant="secondary" onClick={this.onReset}>
                                Reset
                            </Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        )
    };
}

interface EntityDetailsProp {
    entity: any,
    title: string,
    fieldDefs?: Function,
    show?: boolean,
    actions?: Array<any>,
    hide?: Function
}

export class EntityDetails extends Component<EntityDetailsProp> {
    renderField = (field: { id: any, name?: string, value: any }) => {
        return (
            <Row key={"" + field.id} className='entity-value'>
                <Col sm={3} className='v-field-label'>{field.name}</Col>
                <Col sm={9} className='v-field-value'>{field.value}</Col>
            </Row>
        )
    }
    renderFields = () => {
        let entity = this.props.entity;
        if (entity)
        {
            let fieldDefs = this.props.fieldDefs ? this.props.fieldDefs(entity) : entityToArray(entity);
            let rows = fieldDefs.filter((def: any) => {
                return !(['password', 'lov'].includes(def.type) || def instanceof Array || (this.props.hide && this.props.hide(def)));
            });
            return (
                rows.map((def: FieldDefinition, idx: number) =>
                    this.renderField({
                        id: idx, name: def.getLabel ? def.getLabel() :
                            def.name, value: entity[def.name]
                    })
                )
            )
        } else {
            //does nothing/
        }
        
    }
    render() {
        return (
            <div className="entity-form v-container">
                <div className="v-title">{this.props.title}</div>
                <div className="v-container">
                    {this.renderFields()}
                </div>
            </div>
        )
    }
}
interface ListTableProp {
    title: string
    entities: Array<any>,
    onDelete?: Function,
    onSelect?: Function,
    onEdit?: Function,
    fieldDefs: Function,
    view?: string,
    actions?: Array<any>,
    showTitle?: boolean;
}
export class EntityList extends Component<ListTableProp> {
    viewMode: string = 'Table';
    constructor(props: ListTableProp) {
        super(props);
        this.viewMode = props.view ? props.view : 'Table';
        this.state = {
            view: this.viewMode === 'Table' ? 'Grid' : 'Table'
        }
    }
    onSelect = (event: any, selected: any) => {
        event.preventDefault();
        if (this.props.onSelect) {
            this.props.onSelect(selected);
        }
    }
    onDelete = (event: any, selected: any) => {
        event.preventDefault()
        if (this.props.onDelete) {
            this.props.onDelete(selected);
        }
        if (this.props.onSelect) {
            this.props.onSelect(undefined);
        }
    }
    onEdit = (event: any, selected: any) => {
        event.preventDefault()
        if (this.props.onEdit) {
            this.props.onEdit(undefined);
        }
    }
    renderHeaders = () => {
        let fieldDefs = this.props.fieldDefs();
        return (
            fieldDefs.filter((def: FieldDefinition) => { return def.type !== 'password' })
                .map((def: any, idx: number) => { return (<th key={idx.toString()}>{def.getLabel()}</th>) })
        )
    }
    renderRow = (entity: any, idx: number) => {
        let fieldDefs = this.props.fieldDefs(entity);
        return (
            fieldDefs.filter((def: FieldDefinition) => { return def.type !== 'password' })
                .map((def: any, idx: number) => {
                    return (<td key={idx.toString()}
                        onClick={(event: any) => { this.onSelect(event, entity) }}>{entity[def.name]}</td>)
                })
        )
    }
    renderCard = (entity: any, idx: number) => {
        let fieldDefs = this.props.fieldDefs(entity);
        return (
            fieldDefs.filter((def: FieldDefinition) => { return def.type !== 'password' })
                .map((def: FieldDefinition, idx: number) => { return (<div key={idx.toString()}>{entity[def.name]}</div>) })
        )
    }
    changeView = (view: string) => {
        this.viewMode = this.viewMode === 'Table' ? 'Grid' : 'Table';
        this.setState({
            view: this.viewMode === 'Table' ? 'Grid' : 'Table'
        })
    }
    render() {
        let state = this.props;

        let actions = this.props.actions ? [...this.props.actions] : [];
        let entities: Array<any> = this.props.entities ? this.props.entities : [];
        actions.push({
            name: (this.state as any).view,
            action: this.changeView
        });
        let rowActions = [];
        if (this.props.onDelete) {
            rowActions.push(this.props.onDelete)
        }
        if (this.props.onEdit) {
            rowActions.push(this.props.onEdit)
        }

        return (
            <div className="entity-form v-panel">
                {
                    this.props.showTitle ? <Title title={state.title} actions={actions} /> : ""
                }
                <div className='v-body'>
                    <div className='v-panel-content'>
                        {
                            entities.length > 0 ? this.viewMode === 'Table' ?
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {this.renderHeaders()}
                                            {rowActions.length > 0 ? <th>Actions</th> : ""}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            entities.map(
                                                (entity, idx) =>
                                                    <tr key={idx}>
                                                        {this.renderRow(entity, idx)}
                                                        {
                                                            rowActions.length > 0 ? <td>
                                                                <Button variant="outline-secondary" size="sm" onClick={e => this.onDelete(e, entity)}>Delete</Button>
                                                                {' '} <Button variant="outline-secondary" size="sm" onClick={e => this.onEdit(e, entity)}>Edit</Button>
                                                            </td> : ""
                                                        }
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                                :
                                <ToastContainer className="p-3" >
                                    {
                                        entities.map(
                                            (entity, idx) =>
                                                <Toast key={idx.toString()}
                                                    onClick={e => this.onSelect(e, entity)}
                                                    onClose={e => this.onDelete(e, entity)}>
                                                    <Toast.Header>
                                                        <strong className="me-auto">{entity.name}</strong>
                                                    </Toast.Header>
                                                    <Toast.Body>
                                                        {this.renderCard(entity, idx)}
                                                    </Toast.Body>
                                                </Toast>
                                        )
                                    }
                                </ToastContainer>
                                : <div>No entities yet, please add some</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
