import { Row, Col, Toast, Form, Button } from 'react-bootstrap';
import { LayoutPage } from 'components/v-layout/v-layout'
import { dataSourceManager } from '../dm-app';
import { PureComponent } from 'react';
import TreeView from 'components/v-tree-view/v-tree-view';
import { getConfigs } from 'config/v-config';
import "./market-place.css"
import { SelectOne } from 'components/v-select/v-select';
import { DataTable } from 'components/v-table/v-table-1';
import { StringUtils } from 'components/v-utils/v-string-utils';
interface MarketPlaceProps {

}
interface MarketPlaceState {
    selected: any,
    path?: string,
    categories?: any[],
    samples?: any[],
    selectedCategory?: any
}
export class MarketPlace extends PureComponent<MarketPlaceProps, MarketPlaceState> {
    constructor(props: MarketPlaceProps) {
        super(props);
        this.state = { selected: undefined };
    }
    getTaxonomy = () => {
        const taxonomy = getConfigs()["taxonomy"];
        return {
            id: "Taxonomy",
            text: "Taxonomy",
            children: taxonomy
        };
    }
    getPath = (node: any) => {
        let path = node.text;
        let parent = node.parent;
        while (parent) {
            path = parent.text + " > " + path;
            parent = parent.parent;
        }
        return path;
    }
    onSelect = (event: any, node: any) => {
        console.log("onSelect", node);
        this.setState({ selected: node, path: this.getPath(node), categories: undefined, samples: undefined, selectedCategory: undefined });
    }
    onCancel = (event: any) => {
        console.log("onSelect", event);
    }
    onSubmit = (event: any) => {
        console.log("onSelect");
    }
    onCheckAll = (event: any) => {
        console.log("onSelect");
    }
    onSelectAttribute = (event: any) => {
        let selected = this.state.selected;
        let attributes = selected.data.attributes;
        let attribute = attributes.find((a: any) => a.id === event.value);
        if (attribute && attribute.values) {
            let values = attribute.values.map((v: any) => {
                return {
                    value: v.id,
                    label: v.text
                }
            });
            this.setState({ categories: values, samples: attribute.samples });
        } else {
            this.setState({ categories: undefined, samples: undefined, selectedCategory: undefined });
        }
    }
    onSelectCategory = (event: any) => {
        this.setState({ selectedCategory: event.value });
    }
    getSampleSet = () => {
        let samples: Array<Array<any>> = this.state.samples ? this.state.samples : [];
        return {
            id: "samples-ds",
            updatedAt: Date.now(),
            headers: ["Select", "Category", "Size", "Weight", "Carbon Footprint", "Material", "Last Updated"]
                .map((v: any, idx: number) => {
                    return { id: idx, text: v }
                }),
            rows: samples.filter((value) => {
                if (this.state.selectedCategory) {
                    return value[0] === this.state.selectedCategory;
                }
                return true;
            }).map((v: Array<any>, idx: number) => {
                let item = v;
                let col = 0;
                return {
                    id: 'r' + idx,
                    cols: [{
                        id: "select-" + idx,
                        text: "Select",
                        type: "checkbox",
                        value: item !== undefined,
                    },
                    {
                        id: 'c' + idx,
                        text: StringUtils.t(v[col++]),
                        value: v[col]
                    },
                    {
                        id: 's' + idx,
                        text: StringUtils.t(v[col++]),
                        value: v[col]
                    },
                    {
                        id: 'w' + idx,
                        text: StringUtils.t(v[col++]),
                        value: v[col]
                    },
                    {
                        id: 'cf' + idx,
                        text: StringUtils.t(v[col++]),
                        value: v[col]
                    },
                    {
                        id: 'm' + idx,
                        text: StringUtils.t(v[col++]),
                        value: v[col]
                    },
                    {
                        id: 'lud' + idx,
                        text: new Date().toLocaleString(),
                        value: "d" + idx
                    }]
                }
            })
        }
    }

    handleSampleTableValueChange = (v: any, row: any, col: any, checked: any) => {
        let selectedRow = v.rows[row];
        if (col === 0) {

        }
    }
    renderEntity = () => {
        let selected = this.state.selected;
        let attributes = selected.data.attributes;
        return attributes ? this.renderDetails() : <Toast >
            <Toast.Header closeButton={false}>
                {this.state.path}
            </Toast.Header>
            <Toast.Body>
                {selected.text} is not available yet, please select another node.
            </Toast.Body>
        </Toast>
    }

    renderDetails = () => {
        let selected = this.state.selected;
        let attributes = selected.data.attributes;
        if (attributes) {
            attributes = attributes.map((attribute: any) => {
                return {
                    label: attribute.text,
                    value: attribute.id
                }
            });
        }
        return (<>
            <Toast >
                <Toast.Header closeButton={false}>
                    {this.state.path}
                </Toast.Header>
                <div className="v-flex v-filters-box">
                    {
                        attributes ? <SelectOne placeHolder="Please select a category" options={attributes} onChange={this.onSelectAttribute} /> : ""
                    }
                    {this.state.categories ? <SelectOne placeHolder="Please select a sub category" options={this.state.categories} onChange={this.onSelectCategory} /> : ""}
                    <div className="v-flex v-flex-end">
                        <Form.Check type="checkbox" onChange={this.onCheckAll} checked={true} label="Select All" />
                        <div className="v-icon-button" onClick={this.onCancel}>
                            Cancel
                        </div>
                        <div className="v-icon-button" onClick={this.onSubmit}>
                            Submit
                        </div>
                    </div>
                </div>
            </Toast>
            <Toast >
                <Toast.Header closeButton={false}>
                    Sample Data
                </Toast.Header>
                <div className="v-flex v-filters-box">
                    <DataTable onDataChanged={this.handleSampleTableValueChange} data={this.getSampleSet()} />
                </div>
            </Toast>
            <Toast >
                <Toast.Header closeButton={false}>
                    Export Dataset
                </Toast.Header>
                <div className="v-flex v-filters-box">
                    <span>Export Dataset</span>
                    <div className="v-flex">
                        <Form.Control type="text" value={"datasetname"} onChange={()=>{}}/>
                        <Form.Select value={1} onChange ={()=>{}}  >
                            <option>Open this select menu</option>
                            <option value="1">Microsoft Power BI</option>
                            <option value="2">SQL DB</option>
                            <option value="3">Amazon Storage</option>
                        </Form.Select>
                    </div>
                    <div className="v-icon-button v-flex-end" onClick={this.onSubmit}>
                        Ok
                    </div>
                </div>
            </Toast>
        </>
        )
    }

    renderWelcome = () => {
        return (<>
            <div className="v-dashboard-panel"> <Row >
                <Col>
                    <Toast >
                        <Toast.Header closeButton={false}>
                            Become a Data Provider
                        </Toast.Header>
                        <Toast.Body>
                            <Row >
                                <Col>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formDataDesc">
                                            <Form.Label>Data Description</Form.Label>
                                            <Form.Control onChange={() => { }} type="text" placeholder="Data Description" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBizModel">
                                            <Form.Label>Expected Business Model</Form.Label>
                                            <Form.Control onChange={() => { }} type="text" placeholder="Business Model" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formButtons">
                                            <Button >
                                                Cancel
                                            </Button>
                                            &nbsp;
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Toast.Body>
                    </Toast>
                </Col>
                <Col>
                    <Toast >
                        <Toast.Header closeButton={false}>
                            Request a New Dataset
                        </Toast.Header>
                        <Toast.Body>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formDataDesc">
                                            <Form.Label>Data Description</Form.Label>
                                            <Form.Control onChange={() => { }} type="text" placeholder="Data Description" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBizModel">
                                            <Form.Label>When do you need the data</Form.Label>
                                            <Form.Control onChange={() => { }} type="text" placeholder="date" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formButtons">
                                            <Button >
                                                Cancel
                                            </Button>
                                            &nbsp;
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Toast.Body>
                    </Toast>
                </Col>
            </Row>
            </div>
            <div className="v-dashboard-panel">
                <div className="new-arrivals">
                    <Row>
                        <div className="v-title">New Arrivals</div>
                        {["Test1", "Test2", "Test3", "Test4", "Test5"].map((node) => {
                            return (
                                <Col key={node} className="new-arrival">
                                    <img src="./resources/supplier.svg" alt="supplier" className="supplier" />
                                </Col>
                            )
                        })}
                    </Row>
                    <Row>
                        <div className="v-title">Newly Updated Datasets</div>
                        {["Test1", "Test2", "Test3", "Test4", "Test5"].map((node) => {
                            return (
                                <Col key={node} className="new-arrival">
                                    <img src="./resources/supplier.svg" alt="supplier" className="supplier" />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        </>
        )
    }
    render = () => {
        dataSourceManager.headerOption = () => {
            return {
                title: "User Persona: Data Analyst from the Sustainability Org / CIO org",
                visible: true
            }
        }
        return (
            <LayoutPage microApp={dataSourceManager} header={true} pageName="data-cloud">
                <div slot="side-nav">
                    <div className="v-dashboard-panel">
                        <div className='v-header'>
                            <span style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                Data Marketplace Dashboard
                            </span>
                        </div>
                        <TreeView onClick={this.onSelect} options={{ selectable: false, enableLinks: false, selectChildren: true }} data={this.getTaxonomy()} />
                    </div>
                </div>
                {
                    this.state.selected ? this.renderEntity() : this.renderWelcome()
                }
            </LayoutPage >
        )
    }
}