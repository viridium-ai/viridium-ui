import { Component } from 'react';
import { Form, Button, Container, Row, Table, Col, Toast, ToastContainer, Offcanvas } from 'react-bootstrap';
import { FieldValue, FieldDefinition } from './schema-types';
import { schemaApp } from './schema-micro-app';
import './service-component.css';
import { restClient } from '../../common/rest-client';


import { TitleProp, Action } from '../../common/micro-app';

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

export interface FormFieldProp {
    value: FieldValue,
    onInput: any,
    options?: Array<{ value: string, label: string }>
}

export class FormField extends Component<FormFieldProp>{
    render() {
        let props = this.props as FormFieldProp;
        let fieldValue = props.value;
        let def = fieldValue.definition!;
        return (
            <Form.Group className="mb-3" controlId={def.getLabel()}>
                <Form.Label>{def.getLabel()}</Form.Label>
                {def.required ?
                    <Form.Control type={def.getType()} required
                        value={fieldValue.value}
                        onInput={props.onInput}
                        placeholder={def.getPlaceHolder()} /> :
                    <Form.Control type={def.getType()}
                        value={fieldValue.value}
                        onInput={props.onInput}
                        placeholder={def.getPlaceHolder()} />
                }
            </Form.Group>
        )
    }
}

export class SelectField extends Component<FormFieldProp>{
    render() {
        let props = this.props as FormFieldProp;
        let fieldValue = props.value;
        let def = fieldValue.definition!;

        let options = props.options ? props.options :
            [{ value: 'test', label: "Test" }, { value: 'test1', label: "Test 1" }];

        return (
            <Form.Group className="mb-3" controlId={def.getLabel()}>
                <Form.Label>{def.getLabel()}</Form.Label>
                <Form.Select value={fieldValue.value} onInput={props.onInput}>
                    {options.map(opt => <option value={opt.value}>{opt.label}</option>)}
                </Form.Select>
            </Form.Group>
        )
    }
}

interface FormProp {
    title: string,
    listUpdated: Function;
    entity: any;
    mode: string;
    path: string;
    fieldDefs: Function;
}

export class EntityForm extends Component<FormProp> {
    listUpdated: Function;
    messageForm: any;
    path: string;
    constructor(props: FormProp) {
        super(props)
        this.listUpdated = props.listUpdated;
        this.state = { ...props.entity };
        this.path = props.path;
    }

    onReset = (event: any) => {
        this.setState({ ...this.props.entity });
        this.messageForm?.reset();
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        let entity = { ...this.state } as any;
        if (entity) {
            let isNew = this.props.mode === 'create';
            let apiPath = this.path + (isNew ? '' : "/" + entity.id)
            let data = schemaApp.toPayload(this.path, entity, this.props.mode);
            let promise = isNew ? restClient.post(apiPath, data) : restClient.put(apiPath, data);
            promise.then((res) => {
                this.listUpdated && this.listUpdated();
                this.onReset(event);
            }).catch(error => {
                console.log("error", error);
            });
        } else {
            console.log('Can not add a new user')
        }
    }

    onUpdateState = (state: any) => {
        this.setState({ ...state });
    }

    getOptions = (fieldName: string) => {
        console.log(fieldName);
        let test: any = [];//require("./sp500.json");
        return test.map((item: any) => {
            return { value: item.Symbol, label: item.Name }
        });
    }

    renderFields = () => {
        let newState: any = this.state;
        let fieldDefs = this.props.fieldDefs(newState);
        return (
            fieldDefs.filter((def: FieldDefinition) => !def.readonly)
                .map((def: FieldDefinition, idx: number) => {
                    let value = newState[def.name];
                    return (
                        ['lov'].includes(def.type) ?
                            <SelectField key={idx.toString()} value={def.value(value)} onInput={(e: any) => {
                                newState[def.name] = e.target.value;
                                this.setState({ ...newState });
                            }} options={this.getOptions(def.name)} /> :
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
            <Container className="panel-container">
                <Title title={this.props.title} />
                <Row>
                    <Form ref={(form: any) => this.messageForm = form} onSubmit={this.onSubmit}>
                        {this.renderFields()}
                        <Form.Group>
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
    fieldDefs: Function,
    show?: boolean,
    actions?: Array<any>
}

export class EntityDetails extends Component<EntityDetailsProp> {

    renderFields = () => {
        let entity = this.props.entity;
        let fieldDefs = this.props.fieldDefs(entity);
        return (
            fieldDefs.filter((def: any) => !['password', 'lov'].includes(def.type))
                .map((def: FieldDefinition, idx: number) =>
                    <Row key={idx.toString()} className='entity-value'>
                        <Col sm={3} className='field-label'>{def.getLabel()}</Col>
                        <Col sm={9} className='field-value'>{entity[def.name]}</Col>
                    </Row>
                )
        )
    }

    render() {
        let actions = this.props.actions ? [...this.props.actions] : [];
        return (
            <div className="panel-container">
                <Title title={this.props.title} actions={actions} />
                <div className="panel-body">
                    {this.renderFields()}
                </div>
            </div>
        )
    }
}

interface ListTableProp {
    title: string
    entities: Array<any>,
    onDelete: Function,
    onSelect: Function,
    onEdit: Function,
    fieldDefs: Function,
    view?: string
    actions?: Array<any>
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
        event.preventDefault()
        this.props.onSelect(selected);
    }

    onDelete = (event: any, selected: any) => {
        event.preventDefault()
        this.props.onDelete(selected);
        this.props.onSelect(undefined);
    }
    onEdit = (event: any, selected: any) => {
        event.preventDefault()
        this.props.onEdit(selected);
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

        return (
            <div className="schema-app panel-container">
                <Title title={state.title} actions={actions} />
                <div className='panel-body'>
                    <div className='panel-content'>
                        {
                            entities.length > 0 ? this.viewMode === 'Table' ?
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {this.renderHeaders()}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            entities.map(
                                                (entity, idx) =>
                                                    <tr key={idx}>
                                                        {this.renderRow(entity, idx)}
                                                        <td>
                                                            <Button variant="outline-secondary" size="sm" onClick={e => this.onDelete(e, entity)}>Delete</Button>
                                                            {' '} <Button variant="outline-secondary" size="sm" onClick={e => this.onEdit(e, entity)}>Edit</Button>
                                                        </td>
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
