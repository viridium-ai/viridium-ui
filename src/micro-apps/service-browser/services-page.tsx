import { PureComponent } from 'react';
import { LayoutBodyNav, LayoutPage } from 'components/v-layout/v-layout'
import { Service, ServiceSchema } from './service-types';
import { serviceApp } from './service-app';
import { FieldDef, EntityList, EntityForm } from 'components/v-entity/entity-form';
import { restClient } from 'components/v-common/v-client';
import { Tabs, Tab } from 'react-bootstrap';
export class ServiceClient extends PureComponent<any, any> {
    service: Service;
    constructor(props: any) {
        super(props);
        this.service = props.service;
        this.state = {
            response: undefined,
            path: "",
            method: "get",
            request: JSON.stringify(this.service.getSchema()?.getEmptyObject(), null, 2)
        }
    }
    updateService = () => {
        this.setState({
            response: "",
            path: "",
            method: "get",
            request: JSON.stringify(this.service.getSchema()?.getEmptyObject(), null, 2)
        })
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.service !== this.props.service) {
            this.service = this.props.service;
            this.updateService();
        }
    }
    handleChangeMethod = (evt: any) => {
        this.setState({ method: evt.currentTarget.value, response: "" });
    }
    onPathValueChange = (evt: any) => {
        this.setState({ path: evt.currentTarget.value });
    }
    onRequestValueChange = (evt: any) => {
        this.setState({ request: evt.currentTarget.value });
    }
    handleEdit = (object: any) => {
        this.setState({ selectedObject: object });
    }
    send = () => {
        switch (this.state.method) {
            case "get":
                this.service.path && restClient.get(this.service.path + this.state.path).then((json) => {
                    this.setState({ response: JSON.stringify(json, null, 2) });

                }).catch((error) => {
                    console.log("Failed to get api doc", error);
                });
                break;
            case "post":
                this.service.path && restClient.post(this.service.path + this.state.path, JSON.parse(this.state.request)).then((json) => {
                    this.setState({ response: JSON.stringify(json, null, 2) });
                }).catch((error) => {
                    console.log("Failed to get api doc", error);
                });
                break;
            case "put":
                this.service.path && restClient.put(this.service.path + this.state.path, JSON.parse(this.state.request)).then((json) => {
                    this.setState({ response: JSON.stringify(json, null, 2) });
                }).catch((error) => {
                    console.log("Failed to get api doc", error);
                });
                break;
            case "delete":
                this.service.path && restClient.delete(this.service.path + this.state.path).then((json) => {
                    this.setState({ response: JSON.stringify(json, null, 2) });
                }).catch((error) => {
                    console.log("Failed to get api doc", error);
                });
                break;
            default:
                break;
        }
    }
    render = () => {
        let postRequired = ["post", "put"].includes(this.state.method);
        let ui = (
            <div className='v-rest-client'>
                <div className='v-request-bar'>
                    <div className='v-method-path'>
                        <select id="rest-client-method" name="method"
                            onChange={this.handleChangeMethod} value={this.state.method} >
                            <option value="get">Get</option>
                            <option value="post">Post</option>
                            <option value="put">Put</option>
                            <option value="delete">Delete</option>
                        </select>
                        <div className="rest-client-input">
                            <input value={this.state.path} onChange={this.onPathValueChange} className="rest-client-params" type="text" />
                        </div>
                    </div>
                    <div className='v-button v-right' onClick={this.send}>Send</div>
                </div>
                <div className="v-request-response">
                    {
                        postRequired && <div className="v-request-body">
                            <div className="v-title">Request</div>
                            <textarea value={this.state.request} onChange={this.onRequestValueChange} className="json-request">

                            </textarea>
                        </div>
                    }
                    <div className="v-response-body">
                        <div className="v-title">Response</div>
                        <textarea readOnly className={`json-response${postRequired ? '' : ' v-high'}`} value={this.state.response} >
                        </textarea>
                    </div>
                </div>
            </div>
        )
        return ui;
    }
}
export class ServiceBrowser extends PureComponent<any, any> {
    schema: ServiceSchema;
    service: Service;
    constructor(props: any) {
        super(props);
        this.service = props.service;
        this.schema = this.service?.getSchema()!;
        let keys = Object.keys(this.schema.properties);
        let properties = keys.map((key: any) => {
            return {
                name: key,
                ...this.schema.properties[key]
            }
        });
        this.state = {
            selectedObject: undefined,
            entities: properties,
            data: undefined,
            errors : [],
            service: this.service,
            routeItems: serviceApp.getNavItems().map((service) => service.toNavItem())
        }
    }
    updateService = () => {
        this.schema = this.service?.getSchema()!;
        let keys = Object.keys(this.schema.properties);
        let properties = keys.map((key: any) => {
            return {
                name: key,
                ...this.schema.properties[key]
            }
        });
        this.setState({
            selectedObject: undefined,
            entities: properties,
            service: this.service
        })
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.service !== this.props.service) {
            this.service = this.props.service;
            this.updateService();
        }
    }
    serviceFields = (data: any): Array<FieldDef> => {
        return [
            FieldDef.new("name"),
            FieldDef.new("type")
        ];
    }
    showErrors(errors: string[]) {
        throw new Error('Method not implemented.');
    }
    fieldDefs = (data: any): Array<FieldDef> => {
        return this.schema.getFieldDefs();
    }

    getNavItem = () => {
        return undefined;
    }
    handleEdit = (object: any) => {
        this.setState({ selectedObject: object });
    }

    onSubmit = (data: any, form: any) => {
        let errors = this.schema.validate(data);
        if (errors.length > 0) {
            this.showErrors(errors);
            //form.setErrors(errors);
        } else {
            this.service.path && restClient.post(this.service.path, data).then((json) => {
                this.setState({ response: JSON.stringify(json, null, 2) });
            }).catch((error) => {
                console.log("Failed to get api doc", error);
            });
        }
    }
    //UI 
    render = () => {
        let ui = (
            <div className='schema-app' >
                <LayoutPage microApp={serviceApp}>
                    <div className="v-page-body">
                        <div className="v-body-nav">
                            <LayoutBodyNav selected={this.getNavItem()} routeItems={this.state.routeItems} />
                        </div>
                        <div className="v-body-main">
                            <div className="v-flex v-header">
                                <span className="me-auto">{this.service.getLabel()}</span>
                                <span>{this.service.path}</span>
                            </div>
                            <div className='v-container'>
                                <Tabs defaultActiveKey="client" id="service-browser-tabs" >
                                    <Tab eventKey="client" title="Client">
                                        <ServiceClient service={this.state.service} />
                                    </Tab>
                                    <Tab eventKey="schema" title="Schema">
                                        <EntityList view='Table' title={`${this.schema.getLabel()}`} entities={this.state.entities}
                                            onSelect={(res: any) => { this.setState({ selectedObject: res }) }} fieldDefs={this.serviceFields}
                                        />
                                    </Tab>
                                    <Tab eventKey="data" title="Data">
                                        {
                                            <EntityForm inline entity={this.schema.getEmptyObject()}
                                                onSubmit={this.onSubmit}
                                                title={`${this.schema.getLabel()} Details`} fieldDefs={this.fieldDefs} />
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </LayoutPage>
            </div >
        );
        return ui;
    }
}
