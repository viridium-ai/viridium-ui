import React from "react";
import { Button, Form, Table } from "react-bootstrap";

import "./table.css";

interface DimensionViewProps {
    data: Array<{ id: string, label: string }>,
    options?: {
        onSelectValue?: Function,
        value?: any;
        label?: string,
        placeHolder?: string
    }
}

interface DimensionViewState {
    selected: string
}

export class DimensionView extends React.Component<DimensionViewProps, DimensionViewState> {
    constructor(props: DimensionViewProps) {
        super(props);
        this.state = { selected: props.options?.value };
    }

    onSelectDim = (evt: any) => {
        const options = this.props.options;
        let v = this.props.data.find((v: any) => v.id === evt.target.value);
        this.setState({ selected: evt.target.value });
        if (options?.onSelectValue) {
            options.onSelectValue(v);
        }
        evt.stopPropagation();
    }
    render = () => {
        const options = this.props.options;
        return (
            <div className="dimension-container">
                {
                    options?.label ? <div className="dimension-title">{options.label}</div> : ""
                }
                <Form.Select className="dimension-select" value={this.state.selected} onChange={this.onSelectDim}>
                    <option value="" >{options?.placeHolder} </option>
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
    onSelectRow?: Function,
    options?: any
}
interface DataTableState {
    data: any
}
export class DataTable extends React.Component<DataTableProps, DataTableState> {
    constructor(props: DataTableProps) {
        super(props);
        this.state = { data: props.data };
    }
    componentDidMount(): void {
        this.setState({ data: this.props.data });
    }
    shouldComponentUpdate = (nextProps: DataTableProps, nextState: DataTableState, nextContext: any): boolean => {
        if (this.state.data.rows.length !== nextProps.data.rows.length) {
            this.setState({ data: nextProps.data });
            return true;
        }
        return false;
    }
    onSelectRow = (evt: any) => {
        evt.stopPropagation();
        if (this.props.onSelectRow) {
            this.props.onSelectRow(evt.currentTarget.id);
        }
    }
    onRowChecked = (evt: any) => {
        console.log(evt);
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
                                        return <td className={"data-cell-" + col.type} key={'c' + jdx}>{col.type === 'checkbox' ? <Form.Check checked={col.value} type="checkbox" onChange={this.onRowChecked} />
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