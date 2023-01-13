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
    onDataChanged?:Function,
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
        if (this.state.data.rows.length !== nextProps.data.rows.length ) {
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

    onValueChange = (evt: any) => {
        let row_col = evt.target.id.split(".");
        const row = parseInt(row_col[0]);
        const col = parseInt(row_col[1]);
        let newData = {...this.state.data};
        newData.rows[row].cols[col].value = evt.target.value;
        this.setState({data: newData});
        if(this.props.options.onDataChanged) {
            this.props.options.onDataChanged(this.state.data);
        }
        this.forceUpdate();
    }

    renderCell = (cellData: any, row: number, col: number) => {
        const id = `${row}.${col}`;
        return cellData.type === 'checkbox' ? <Form.Check id={id} checked={cellData.value} type="checkbox" onChange={this.onValueChange} />
            : cellData.type === 'button' ? <Button id={id} onClick={cellData.onClick} >{cellData.text}</Button>
                : cellData.type === 'input' ? <Form.Control type="text" id={id} onChange={this.onValueChange} value={cellData.value} />
                    : cellData.type === 'select' ? <Form.Select id={id} onChange={this.onValueChange} value={cellData.value || ''}>
                        {cellData.options.map((o: any, idx: number) => <option key={'o' + idx} value={o.value}>{o.text}</option>)}
                    </Form.Select> : cellData.text
    }

    render = () => {
        let tableData = this.state.data;
        if (!tableData) {
            return <div>No data available</div>
        }
        let rowsToShow = tableData.rows.filter((row: any, idx: number) => this.props.options && this.props.options.show ? idx < this.props.options.show : true);
        return (
            <Table className="v-table" bordered hover size="sm">
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
                        rowsToShow.map((row: any, idx: number) => {
                            return <tr key={'r' + idx} onClick={this.onSelectRow} id={row.id}>
                                {
                                    row.cols.map((col: any, jdx: number) => {
                                        return <td className={"data-cell-" + col.type} key={'c' + jdx}>
                                            {
                                                this.renderCell(col, idx, jdx)
                                            }
                                        </td>
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