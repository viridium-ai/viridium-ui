import React from 'react'
import { VscSearch } from 'react-icons/vsc';
import { StringUtils } from '../v-utils/v-string-utils';
import "./v-list.css";
type ListValue = {
    value: string,
    label: string,
    group?: string,
    icon?: string
}

type ListProps = {
    className?: string,
    style?: React.CSSProperties,
    id?: string,
    list: Function | Array<ListValue>,
    onSelect?: Function;
    groupClosable?: boolean;
    oneGroupOpen?: boolean;
    showFilter?: boolean;
}

type ListState = {
    selected?: ListValue,
    searchValue: string,
    selectedGroup?: string
}

export class ListView extends React.Component<ListProps, ListState>{
    id: string;
    constructor(props: ListProps) {
        super(props);
        this.id = this.props.id ? this.props.id : StringUtils.guid();
        this.state = { selected: undefined, searchValue: "", selectedGroup: undefined };
    }
    onSelectGroup = (evt: any, group: any) => {
        console.log("onSelectGroup", evt, group);
        this.setState({ selectedGroup: group });
    }
    onSelect = (evt: any, ctx: any) => {
        let value = evt.currentTarget.id.substring(this.id.length + 1);
        this.setState({ selected: value });
        if (this.props.onSelect) {
            this.props.onSelect(ctx);
        }
    }

    onSearch = (evt: any) => {
        let value = evt.currentTarget.value;
        this.setState({ searchValue: value });
    }

    renderGroup = (group: string, items: Array<ListValue>) => {
        const renderItems = this.props.oneGroupOpen === undefined || group === this.state.selectedGroup;
        return (
            <div key={group} className="v-list-group">
                {group !== 'Ungrouped' ? <div className="v-list-group-header" id={this.id + "-" + group} onClick={(evt) => {
                    this.onSelectGroup(evt, group);
                }}>{group}</div> : ""}
                {
                    renderItems ? items.map((item: any, idx: number) => {
                        return <div id={this.id + "-" + item.value} key={idx}
                            className={`v-list-item${this.state.selected === item.value ? ' v-selected' : ''}`} onClick={(evt) => {
                                this.onSelect(evt, item);
                            }}>
                            {
                                <span className="v-list-text"> {item.label}</span>
                            }
                        </div>
                    }) : ""
                }
            </div>
        )
    }

    getList = (): Array<ListValue> | undefined => {
        let filtered = [];
        if (this.props.list instanceof Array) {
            filtered = this.props.list;
        }
        if (this.props.list instanceof Function) {
            filtered = this.props.list();
        }
        if (this.state.searchValue !== "") {
            filtered = filtered.filter((item: any) => item.label.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1);
        }
        return filtered;
    }

    render = () => {
        let groups = this.getList()?.reduce((acc: any, item: any) => {
            if (item.group) {
                if (!acc[item.group]) {
                    acc[item.group] = [];
                }
                acc[item.group].push(item);
            } else {
                acc['Ungrouped'].push(item);
            }
            return acc;
        }, { 'Ungrouped': [] });
        return (
            <div id={this.id} className={`${this.props.className ? this.props.className : ''} v-list`} style={this.props.style}>
                {
                    this.props.showFilter ? <div className="v-list-header">
                        <VscSearch className="v-search-x-icon" onClick={() => {
                            this.setState({ searchValue: "" });
                        }} />
                        <input placeholder={"Search"} className="v-search-input" value={this.state.searchValue} onChange={this.onSearch}></input>
                    </div> : ""
                }
                <div id={this.id + "_list"} className="v-list-container" >
                    {
                        Object.keys(groups).map((group: string) => {
                            return this.renderGroup(group, groups[group]);
                        })
                    }
                </div>
            </div >
        )
    }
}