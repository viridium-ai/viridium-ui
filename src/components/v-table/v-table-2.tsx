import React, { PureComponent } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";
import { FieldDef } from "../v-entity/entity-form";
import { StringUtils } from "../v-utils/v-string-utils";

import "./v-table-2.css";

interface PaginatorProps {
    onPage: Function;
    total: number;
    pageSize: number;
    page?: number;
    shown?: number;
}
interface PaginatorState {
    start: number;
    page: number;
}
export class Paginator extends PureComponent<PaginatorProps, PaginatorState> {
    shown: number;
    constructor(props: PaginatorProps) {
        super(props);
        this.shown = props.shown ? props.shown : 10;
        this.state = { start: 0, page: 0 };
    }
    onSelect = (page: number) => {
        let start = this.shown * Math.floor(page / this.shown);
        this.setState({ start: start, page: page });
        if (this.props.onPage) {
            this.props.onPage(page)
        }
    }
    render = () => {
        let pages = [];
        let noOfPages = this.props.total / this.props.pageSize;
        let hasMore = this.state.page < noOfPages;
        let hasPrev = this.state.page > 0;
        for (let i = this.state.start; i < this.state.start + Math.min(this.shown, noOfPages); i++) {
            pages.push(i)
        }
        return <div className="v-paginator">
            {
                <span className={`v-page-prev ${hasPrev ? 'v-visible' : 'v-invisible'}`} onClick={() => this.onSelect(this.state.page - 1)}>
                    <GrPrevious /></span>
            }
            {
                pages.map((i) => {
                    return <span onClick={() => this.onSelect(i)}
                        className={`v-page-no${this.state.page === i ? " v-selected" : ""}`}
                        key={"p-" + i} >{i}</span>
                })
            }
            {
                <span className={`v-page-next ${hasMore ? 'v-visible' : 'v-invisible'}`} onClick={() => this.onSelect(this.state.page + 1)}>
                    <GrNext /></span>
            }
        </div>
    }
}
interface VTableProps {
    id?: string;
    title: string;
    rows: Array<any>;
    onDelete?: Function;
    onSelect?: Function;
    onEdit?: Function;
    fieldDefs?: Function;
    actions?: Array<any>;
    showTitle?: boolean;
    pageSize?: number;
    rowRenderer?: Function,
    style?: any;
    className?: string;
    colResizable?: boolean;
}
interface VTableState {
    selected?: any;
    rows: Array<any>;
    page: number;
    sortDir: number
}

export default class VTable extends React.PureComponent<VTableProps, VTableState> {
    id: string;
    constructor(props: VTableProps) {
        super(props);
        this.id = props.id ? props.id : StringUtils.guid();
        this.state = { rows: props.rows, selected: undefined, page: 0, sortDir: 1 };
    }
    componentDidUpdate(prevProps: Readonly<VTableProps>, prevState: Readonly<VTableState>, snapshot?: any): void {
        if (this.props.rows !== prevProps.rows) {
            this.setState({ rows: this.props.rows });
        }
    }
    onSelectRow = (evt: any) => {
        evt.preventDefault();
        let rowId = evt.currentTarget.id;
        if (this.props.onSelect) {
            let row = this.props.rows.find((d: any) => d.id === evt.currentTarget.id);
            this.props.onSelect(rowId, row, evt.currentTarget);
        }
        this.setState({ selected: rowId })
    }
    onSelectPage = (page: number) => {
        this.setState({ selected: undefined })
        this.setState({ page: page });
    }
    getFieldDefs = () => {
        let fieldDefs = [];
        if (this.props.fieldDefs) {
            if (this.props.fieldDefs instanceof Array) {
                fieldDefs = [...this.props.fieldDefs];
            }
            else {
                fieldDefs = this.props.fieldDefs();
            }
        }
        return fieldDefs;
    }
    sort = (def: FieldDef) => {
        let rows = [...this.props.rows];
        let dir = this.state.sortDir;
        rows.sort((a: any, b: any) => {
            let one = a[def.name];
            let two = b[def.name];
            if (typeof one === 'string' || one instanceof String) {
                return dir * two.localeCompare(one);
            }
            if (typeof one === 'number' || one instanceof Number) {
                return dir * (-one as number + two as number);
            }
            return 0;
        });
        this.setState({ rows: rows, sortDir: -dir, selected: undefined })
    }
    renderRow = (entity: any, idx: number) => {
        let fieldDefs = this.getFieldDefs();
        let rowId = entity.id ? entity.id : "r-" + idx;
        let rowClass = `v-table-row v-${idx % 2 === 0 ? 'even' : 'odd'}${rowId === this.state.selected ? ' v-selected' : ''}`;
        return <div className={rowClass} onClick={this.onSelectRow} id={rowId} key={'r-' + rowId} >
            {
                fieldDefs.map((def: FieldDef, jdx: number) => {
                    return <div style={this.colW(idx, fieldDefs.length)} className={"v-td v-cell-" + def.getUIType()} key={'c' + jdx}>
                        {
                            def.getAttributeValue(entity)
                        }
                    </div>
                })
            }
        </div>
    }
    colW = (i: number, cols: number) => {
        return { width: `calc(100%/${cols} - 1px` };
    }
    renderTable = (fieldDefs: Array<FieldDef>, rowsToShow: Array<any>) => {
        return <div className="v-table-container" >
            <div className="v-thead">
                {
                    fieldDefs.map((def: FieldDef, idx: number) => {
                        return <div className={"v-th"} style={this.colW(idx, fieldDefs.length)} key={'h' + idx}>
                            <span dangerouslySetInnerHTML={{ __html: def.getLabel()! }} />
                            {
                                def.sortable ? <span className="v-sort" onClick={() => {
                                    this.sort(def);
                                }} >
                                    {this.state.sortDir === 1 ? <ImSortAlphaAsc /> : <ImSortAlphaDesc />}
                                </span> : ""
                            }
                            {
                                this.props.colResizable && idx < fieldDefs.length - 1 ? <span className="v-th-divider"></span> : ""
                            }
                        </div>
                    })
                }
            </div>
            <div className="v-tbody">
                {
                    rowsToShow.map((entity: any, idx: number) => {
                        return this.renderRow(entity, idx)
                    })
                }
            </div>
        </div>
    }
    renderTable1 = (fieldDefs: Array<FieldDef>, rows: Array<any>) => {
        //let first = fieldDefs[0];
        return <div className="v-table-fixed-container" >
            <div className="v-fixed">
                <div className="v-table-container">
                    <div className="v-thead">
                        <div className={"v-th"}>
                            <span>Header</span>
                        </div>
                    </div>
                    <div className="v-tbody">
                        {
                            rows.map((entity: any, idx: number) => {
                                return <div className="v-table-row" key={idx}>
                                    <div className="v-td v-cell-text">
                                        test
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="v-scrollable">
                <div className="v-table-container">
                    <div className="v-thead">
                        {
                            fieldDefs.map((def: FieldDef, idx: number) => {
                                return <div className={"v-th"} style={this.colW(idx, fieldDefs.length)} key={'h' + idx}>
                                    <span dangerouslySetInnerHTML={{ __html: def.getLabel()! }} />
                                    {
                                        def.sortable ? <span className="v-sort" onClick={() => {
                                            this.sort(def);
                                        }} >
                                            {this.state.sortDir === 1 ? <ImSortAlphaAsc /> : <ImSortAlphaDesc />}
                                        </span> : ""
                                    }
                                    {
                                        this.props.colResizable && idx < fieldDefs.length - 1 ? <span className="v-th-divider"></span> : ""
                                    }
                                </div>
                            })
                        }
                    </div>
                    <div className="v-tbody">
                        {
                            rows.map((entity: any, idx: number) => {
                                return this.renderRow(entity, idx)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    }
    render = () => {
        let tableData = this.state.rows;
        if (!tableData) {
            return <div>No data available</div>
        }
        let rowsToShow = tableData;
        let pageSize = this.props.pageSize ? this.props.pageSize : 20;
        let pages = tableData.length / pageSize;
        let offset = this.state.page * pageSize
        rowsToShow = rowsToShow.slice(offset, offset + pageSize);
        let fieldDefs = this.getFieldDefs() as Array<FieldDef>;
        return (
            <div className={`v-table-2${this.props.className ? " " + this.props.className : ''}`} style={this.props.style} id={this.id}>
                <div className="v-table-header" >

                </div>
                {
                    this.renderTable(fieldDefs, rowsToShow)
                }
                <div className="v-table-footer" >
                    {
                        pages > 1 ?
                            <Paginator total={this.props.rows.length} pageSize={pageSize} page={this.state.page}
                                onPage={this.onSelectPage} /> : ""
                    }
                </div>
            </div>
        );
    }
}