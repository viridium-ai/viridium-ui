import React, { MouseEventHandler } from "react";
import { Table, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export interface TableCell {
    id: string,
    type: string,
    value: any,
    text: string,
    onClick?: MouseEventHandler,
    ui: any
}

export interface TableRow {
    id: string,
    cells: Array<TableCell>,
    ui: any
}

export interface TableData {
    id: string,
    headers: Array<TableCell>,
    rows: Array<TableRow>,
    ui: any
}

export interface DataTableProps {
    data: TableData,
    onSelectRow: MouseEventHandler
}

export interface DataTableState {
    data: TableData
}

export class DataTable extends React.Component<DataTableProps, DataTableState> {

    static new = (data: any): TableData => {
        return data as TableData;
    }

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
        return (
            <div className="data-table-container" id={tableData.id}>
                <Table bordered hover size="sm">
                    <thead>
                        <tr >
                            {
                                tableData.headers.map((col: TableCell, idx: number) => {
                                    return <th key={'h' + idx}>{col.type === 'checkbox' ? <Form.Check type="checkbox" /> : col.text
                                    }</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.rows.map((row: TableRow, idx: number) => {
                                return <tr key={'r' + idx} onClick={this.onSelectRow} id={row.id}>
                                    {
                                        row.cells.map((cell: TableCell, jdx: number) => {
                                            return <td className={"data-cell-" + cell.type} key={'c' + jdx}>{cell.type === 'checkbox' ? <Form.Check checked={cell.value} type="checkbox" />
                                                : (cell.type === 'button' ? <Button onClick={cell.onClick ? cell.onClick : (evt: any) => { }} >{cell.text}</Button>
                                                    : cell.text)
                                            }</td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}