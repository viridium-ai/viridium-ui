import React from "react";
import { Button, Form, Table } from "react-bootstrap";

import "./table.css";

const defaultOptions = {
    selectable: true,
    expandIcon: 'glyphicon glyphicon-plus',
    collapseIcon: 'glyphicon glyphicon-minus',
    emptyIcon: 'glyphicon',
    color: "#428bca",
    bgColor: undefined,
    borderColor: undefined,
    onHoverColor: '#F5F5F5',
    selectedColor: '#000000',
    selectedBgColor: '#FFFFFF',
    highlightSelected: true,
    showBorder: true
};

interface DimensionViewProps {
    data: Array<{ id: string, label: string }>,
    onSelectValue?: Function,
    value?: any;
    label?: string,
    placeHolder?: string
}

interface DimensionViewState {
    selected: string
}

export class DimensionView extends React.Component<DimensionViewProps, DimensionViewState> {
    constructor(props: DimensionViewProps) {
        super(props);
        this.state = { selected: props.value };
    }

    onSelectDim = (evt: any) => {
        let v = this.props.data.find((v: any) => v.id === evt.target.value);
        if (v !== undefined && this.props.onSelectValue) {
            this.setState({selected : evt.target.value});
            this.props.onSelectValue(v);
        }
        evt.stopPropagation();
    }
    render = () => {
        return (
            <div className="dimension-container">
                {
                    this.props.label ? <div className="dimension-title">{this.props.label}</div> : ""
                }
                <Form.Select className="dimension-select" value={this.state.selected} onChange={this.onSelectDim}>
                    <option value="" >{this.props.placeHolder} </option>
                    {
                        this.props.data.map((v: any, idx: number) => <option key={idx} value={v.id} >{v.label}</option>)
                    }
                </Form.Select>
            </div>

        );
    }
}

interface DataTableProps {
    data: any,
    onSelectRow?: Function
}
interface DataTableState {
    data: any
}
export class DataTable extends React.Component<DataTableProps, DataTableState> {
    constructor(props: DataTableProps) {
        super(props);
        this.state = { data: props.data };
    }
    componentDidUpdate = (data: DataTableProps) => {
        if (this.props.data.id !== data.data.id) {
            this.setState({ data: this.props.data });
        }
    }
    onSelectRow = (evt: any) => {
        evt.preventDefault();
        evt.stopePropagation();
        if (this.props.onSelectRow) {
            this.props.onSelectRow(evt.currentTarget.id);
        }
    }
    render = () => {
        let tableData = this.state.data;
        if (!tableData) {
            return <div>No data available</div>
        }
        return (
            <Table bordered hover size="sm">
                <thead>
                    <tr >
                        {
                            tableData.headers.map((col: any, idx: number) => {
                                return <th className={"data-cell-header"} key={'h' + idx}>{col.type === 'checkbox' ? <Form.Check type="checkbox" /> : col.text
                                }</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.rows.map((row: any, idx: number) => {
                            return <tr key={'r' + idx} onClick={this.onSelectRow} id={row.id}>
                                {
                                    row.cols.map((col: any, jdx: number) => {
                                        return <td className={"data-cell-" + col.type} key={'c' + jdx}>{col.type === 'checkbox' ? <Form.Check checked={col.value} type="checkbox" />
                                            : (col.type === 'button' ? <Button onClick={col.onClick} >{col.text}</Button>
                                                : col.text)
                                        }</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        );
    }
}