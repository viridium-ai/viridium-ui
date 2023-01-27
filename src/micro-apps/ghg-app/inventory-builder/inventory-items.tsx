import { Component, useState } from "react";
import { Toast, Form, Row, Col, Button, Tab, Tabs } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DataTable } from "../../../components/v-table/v-table";
import { Action } from "../../../components/v-wizard";
import { getCompany, getConfigs, updateCompany } from "../../../config/v-config";
import { ConnectorView } from "../../dm-app/connector-manager";
import { greenHouseApp } from "../ghg-app";
import { Company, Inventory, InventoryItem } from "./model";
type ItemState = {
    name: string,
    quantity: number,
    typeId: string,
    siteId: string,
    frequency: string,
    scope?: string,
    category?: string
}
type ItemProps = {
    inventory: Inventory,
    category: any,
    scope: any,
    onUpdate: Function
}
export class InventoryItemForm extends Component<ItemProps, ItemState> {
    constructor(props: any) {
        super(props);
        this.state = { name: "", quantity: 1000, frequency: "yearly", siteId: "1", typeId: "1" };
    }
    onFreqChange = (evt: any) => {
        this.setState({ frequency: evt.target.value });
    }
    onSiteChange = (evt: any) => {
        this.setState({ siteId: evt.target.value });
    }
    onTypeChange = (evt: any) => {
        this.setState({ typeId: evt.target.value });
    }

    onQuantityChange = (evt: any) => {
        this.setState({ quantity: evt.target.value });
    }

    onAddItem = () => {
        let item = new InventoryItem();
        Object.assign(item, this.state);
        item.scope = this.props.scope;
        item.category = this.props.category;
   
        let c = getCompany();
        c.inventory?.addItem(item);
        updateCompany(c);
        this.props.onUpdate(c.inventory);
    }
    render = () => {
        let configs = getConfigs();
        let company = getCompany();
        let scope = configs.scopes.find((s: any) => s.id === this.props.scope);
        let category = scope.categories.find((c: any) => c.id === this.props.category);
        let type = category.types?.find((t: any) => t.id === this.state.typeId);
        return (
            <div className="v-container">
                <Row>
                    <Col sm={3} className="v-form-label">Type</Col>
                    <Col sm={8} className="main-form-input">
                        <Form.Select key="itemType" value={this.state.typeId} onChange={this.onTypeChange}>
                            <>
                                <option value="">Select a type</option>
                                {
                                    category.types?.map((type: any, idx: number) => {
                                        return <option key={'type' + idx} value={type.id}>{type.name}</option>
                                    })
                                }
                            </>
                        </Form.Select>
                    </Col>
                    <Col sm={1} className="v-form-label"></Col>
                </Row>
                <Row>
                    <Col sm={3} className="v-form-label">Quantity</Col>
                    <Col sm={7} className="main-form-input">
                        <Form.Control placeholder="Quantity" value={this.state.quantity} type="text" onChange={this.onQuantityChange}></Form.Control>
                    </Col>
                    <Col sm={1} className="v-form-label">{type?.unit ? type.unit : ""}</Col>
                    <Col sm={1} className="v-form-label"></Col>
                </Row>
                <Row>
                    <Col sm={3} className="v-form-label">Frequency</Col>
                    <Col sm={8} className="main-form-input"><Form.Select key="itemFreq" value={this.state.frequency} onChange={this.onFreqChange}>
                        <>
                            <option value="">Select a frequency</option>
                            {
                                configs.frequencies?.map((freq: any, idx: number) => {
                                    return <option key={'freq' + idx} value={freq.id}>{freq.name}</option>
                                })
                            }
                        </>
                    </Form.Select>
                    </Col>
                    <Col sm={1} className="v-form-label"></Col>
                </Row>
                <Row>
                    <Col sm={3} className="v-form-label">Site</Col>
                    <Col sm={8} className="main-form-input">
                        <Form.Select key="itemSite" value={this.state.siteId} onChange={this.onSiteChange}>
                            <>
                                <option value="">Select a site</option>
                                {
                                    company?.sites?.map((site: any, idx: number) => {
                                        return <option key={'site' + idx} value={site.id}>{site.name}</option>
                                    })
                                }
                            </>
                        </Form.Select>
                    </Col>
                    <Col sm={1} className="v-form-label"></Col>
                </Row>
                <Row>
                    <Col sm={3}></Col>
                    <Col className="connector-config-form-btns">
                        <Button className="v-button" disabled={type === undefined} onClick={this.onAddItem}>Add</Button>
                    </Col>
                    <Col sm={1} className="v-form-label"></Col>
                </Row>
            </div>
        )
    };
}
type FileUploaderProps = {
    onReceiveData: Function,
    buttonTxt?: string
}
type FileUploaderState = {
    status: string,
    data: any
}
export class FileUploader extends Component<FileUploaderProps, FileUploaderState> {
    guid: string = crypto.randomUUID();
    constructor(props: FileUploaderProps) {
        super(props);
        this.state = { status: "Choose File", data: undefined }
    }

    csvToTableData = (text: string) => {
        let headers: Array<string> = [];
        let data: Array<Array<string>> = [];
        let lines = text.toString().split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const separate = line.includes("\t") ? "\t" : ",";
            if (i === 0) {
                headers = [...line.split(separate)];
            }
            else {
                data.push(line.split(separate));
            }
        }
        return {
            headers: headers.map((h) => { return { type: "text", text: h } }
            ),
            rows: data.map((r, idx: number) => { return { id: 'r' + idx, cols: r.map(c => { return { type: "text", text: c } }) } })
        };
    }
    onChooseFile = (evt: any) => {
        this.setState({ status: "Preview" });
    }

    doUpload = () => {
        let ele = document?.getElementById(this.guid);
        if (ele !== null) {
            let data = (ele as any).files[0];
            var fr = new FileReader();
            fr.onload = () => {
                let text = fr.result;
                if (text !== null) {
                    const data = this.csvToTableData(text.toString());
                    console.log(data);
                    if (this.state.status === "Preview") {
                        this.setState({ data: { ...data } });
                        this.setState({ status: "Mapping" });
                    }
                    if (this.state.status === "Import") {
                        this.props.onReceiveData(fr.result);
                        this.setState({ status: "Choose File" });
                        this.setState({ data: undefined });
                        (ele as any).value = null;
                    }
                }
            }
            fr.readAsText(data);
        }
    }
    onValueChange = (v: any) => {
        console.log(v.target.value, v.target.id);
    }
    onScopeChange = (v: any) => {
        console.log(v.target.value, v.target.id);
    }
    mappingData = () => {
        let newRows = this.state.data.rows.map((r: any, idx: number) => {
            return {
                cols: [...r.cols,
                { type: "input", text: "", id: "scope" + idx, onChange: this.onValueChange },
                {
                    type: "select", text: "", value: "", onChange: this.onScopeChange, id: "scope" + idx, options:
                        [{ value: "", text: "Select a value" }, { value: "scope1", text: "Scope 1" }, { value: "scope2", text: "Scope 2" }, { value: "scope3", text: "Scope 3" }]
                }]
            }
        })
        let mappingData = {
            headers: [...this.state.data.headers, { text: "Category", type: "text" }, { text: "Scope", type: "text" }],
            rows: newRows
        }
        console.log(mappingData);
        return <DataTable data={mappingData} options={{ show: 3 }} />
    }
    preview = () => {
        return this.state.data ? <DataTable data={this.state.data} options={{ show: 3 }} /> : ""
    }
    render = () => {
        return (
            <div className="v-container">
                <Form.Group className="mb-3">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control id={this.guid} type="file" onChange={this.onChooseFile} />
                </Form.Group>
                <Form.Group className="connector-config-form-btns">
                    <Button disabled={this.state.status === "Choose File"} variant="light" onClick={this.doUpload} name="submit">{this.state.status}</Button>
                </Form.Group>
                <div className="preview-container">
                    {
                        this.state.status === "Mapping" ? this.mappingData() : this.state.status === "Preview" ? this.preview() : ""
                    }
                </div>

            </div>
        )
    };
}


type ViridiumDatasetProp = {

}
type ViridiumDatasetState = {

}
export class ViridiumDataset extends Component<ViridiumDatasetProp, ViridiumDatasetState> {
    constructor(props: ViridiumDatasetProp) {
        super(props);
        this.state = { connector: "1" }
    }

    render = () => {
        let data = getConfigs().reportMockData;
        return (
            <div className="v-container">
                <DataTable data={data} />
            </div>
        )
    };
}
type ConnectorConfigProps = {
    direction : string,
    onProcessData ? : Function
}

type ConnectorConfigState = {
    connector?: any
}
export class ConnectorConfig extends Component<ConnectorConfigProps, ConnectorConfigState> {
    guid: string = crypto.randomUUID();
    constructor(props: ConnectorConfigProps) {
        super(props);
        this.state = { connector: undefined}
    }
    
    doUpload = () => {
        if(this.props.onProcessData)
        {
            this.props.onProcessData("Received data");
        }
        
    }

    onSelectConnector = (evt: any) => {
        let c = evt.target.value;
        this.setState({ connector: c });
    }
    render = () => {
        let configs = getConfigs();
        let connectors =configs.managedConnectors.filter((c:any) => c.direction === "Both" || c.direction === this.props.direction)

        let connector = connectors.find((c: any, idx: number) => c.id === this.state.connector);
        return (
            <div className="v-container">
                <Form.Select onChange={this.onSelectConnector} value={this.state.connector}>
                    {connectors.map((c: any, idx: number) => {
                        return <option key={'c-' + idx} value={c.id}>{c.name}</option>
                    })}
                </Form.Select>
                <Row>
                    <Col >
                        <div className="connector-config-form">
                            {
                                connector ? <ConnectorView connector={connector} /> : <div />
                            }
                        </div>
                    </Col>
                    <Col>
                        {
                            connector ? <div className="connector-config-form">
                                <Form.Group className="connector-config-form-field">
                                    <Form.Label>URL</Form.Label>
                                    <Form.Control id={this.guid + '-url'} type="text" />
                                </Form.Group>
                                <Form.Group className="connector-config-form-field">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control id={this.guid + '-username'} type="text" />
                                </Form.Group>
                                <Form.Group className="connector-config-form-field">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id={this.guid + '-password'} type="secret" />
                                </Form.Group>
                                <Form.Group className="connector-config-form-btns">
                                    <Button variant="light" onClick={this.doUpload} name="submit">{this.props.direction === "Inbound" ? "Import" : "Export"}</Button>
                                </Form.Group>
                            </div> : <div>Please select a connector for your data</div>
                        }
                    </Col>
                </Row>
            </div>
        )
    };
}
export const InventoryItemView = (props: any) => {
    let item: InventoryItem = props.item;
    let mode = props.mode;
    const rowUI = () => {
        return (
            <Row>
                <Col>{item.typeId}</Col>
                <Col>{item.quantity}</Col>
                <Col>{item.frequency}</Col>
                <Col>{item.siteId}</Col>
            </Row>
        )
    }
    const entityUI = () => {
        return (
            <div>
                <Row>
                    <Col>Id</Col>
                    <Col>{item.id}</Col>
                </Row>
                <Row>
                    <Col>Quantity</Col>
                    <Col>{item.quantity}</Col>
                </Row>
                <Row>
                    <Col>Frequency</Col>
                    <Col>{item.frequency}</Col>
                </Row>
                <Row>
                    <Col>Type</Col>
                    <Col>{item.typeId}</Col>
                </Row>
                <Row>
                    <Col>Site</Col>
                    <Col>{item.siteId}</Col>
                </Row>
            </div>
        )
    };
    return mode === 'row' ? rowUI() : entityUI();
}
export const InventoryItemsView = (props: any) => {
    const configs = getConfigs();
    const [company, setCompany] = useState<Company | undefined>(Company.new(getCompany()));
    const [scope, setScope] = useState<string>("1");
    const [category, setCategory] = useState<string>("1");
    const onSelectScope = (evt: any) => {
        setScope(evt.target.value);
        setCategory("1");
    }
    const onSelectCategory = (evt: any) => {
        setCategory(evt.target.value);
    }
    const onUpdate = (inventory: Inventory) => {
        if (company) {
            const c = Company.new(company)!;
            Object.assign(c.inventory!, inventory);
            updateCompany(c);
            setCompany(c);
        }
    }
    const onReceiveData = (data: any) => {
        console.log(data);
    }
    const clearItems = () => {
        if (company) {
            let newInv = new Inventory(company.id);
            newInv.items = [];
            const c = Company.new(company)!;
            c.inventory =newInv;
            updateCompany(c);
        }
    }
    const getInventoryItemsData = () => {
        let inventory = company?.inventory!;
        return {
            id: inventory.id,
            headers: [
                { type: "text", text: "Type" },
                { type: "text", text: "Quantity" },
                { type: "text", text: "Unit" },
                { type: "text", text: "Scope" },
                { type: "text", text: "Category" },
                { type: "text", text: "Frequency" },
                { type: "text", text: "Site" }
            ],
            rows: inventory.items.map((item, idx) => {
                const site = company?.getSite(item.siteId);
                const frequency = configs.frequencies.find((f: any) => f.id === item.frequency);
                const quantity = item.quantity;
                const scope = configs.scopes.find((scope: any) => scope.id === item.scope);
                const category = scope.categories?.find((cat: any) => cat.id === item.category);
                const type = category?.types?.find((t: any) => t.id === item.typeId);

                return {
                    id: item.id,
                    cols: [
                        { type: "text", text: type?.name },
                        { type: "text", text: quantity },
                        { type: "text", text: type?.unit },
                        { type: "text", text: scope.name },
                        { type: "text", text: category?.name },
                        { type: "text", text: frequency?.name },
                        { type: "text", text: site?.name }
                    ]
                }
            }
            )
        }
    }
    const itemForm = () => {
        let scopes = configs.scopes;
        let selectedScope = scopes.find((s: any) => s.id === scope);
        let categories = selectedScope?.categories;
        let inventory = company!.inventory!;
        return (<>
            <Row>
                <Col className="v-summary">
                    <Form.Select value={scope} onChange={onSelectScope}>
                        <>
                            <option value=''>Select a Scope</option>
                            {
                                scopes.map((scope: any, idx: number) => {
                                    return (
                                        <option key={`cat-${idx}`} className="mb-2" value={scope.id}>
                                            {scope.name}
                                        </option>
                                    )
                                })

                            }
                        </>
                    </Form.Select>
                </Col>
                <Col className="v-summary">
                    <Form.Select value={category} onChange={onSelectCategory}>
                        <>
                            <option value=''>{selectedScope !== undefined ? 'Select a category' : 'Please select a scope'}</option>
                            {
                                categories?.map((category: any, idx: number) => {
                                    return (
                                        <option key={`cat-${idx}`} className="mb-2" value={category.id}>
                                            {category.name}
                                        </option>
                                    )
                                })
                            }
                        </>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs defaultActiveKey="manual">
                        <Tab eventKey="manual" title="Manual">
                            <InventoryItemForm inventory={inventory} scope={scope} category={category} onUpdate={onUpdate} />
                            {
                                inventory.items.length > 0 ? <Row>
                                    <Col>
                                        <DataTable data={getInventoryItemsData()} />
                                    </Col>
                                </Row> : ""
                            }
                        </Tab>
                        <Tab eventKey="file" title="File Uploader">
                            <FileUploader onReceiveData={onReceiveData} />
                        </Tab>
                        <Tab eventKey="connector" title="Connectors">
                            <ConnectorConfig onProcessData={onReceiveData} direction="Inbound" />
                        </Tab>
                        <Tab eventKey="viridium-ds" title="Viridium Datasets">
                            <ViridiumDataset />
                        </Tab>
                    </Tabs>

                </Col>
            </Row></>)
    }
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp}  >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            Manage Inventory Items
                        </span>
                        <Button className="v-button" onClick={clearItems}>Clear All</Button>
                    </Toast.Header>
                    <Toast.Body>
                        {
                            itemForm()
                        }
                    </Toast.Body>

                    <Action inventory={company!.inventory}
                        next={{ label: "Next", path: props.next }}
                        prev={{ label: "Back", path: props.prev }} />
                </Toast>
            </LayoutPage >
        )
    }
    return ui();
}