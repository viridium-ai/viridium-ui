import { PureComponent } from "react";
import { StringUtils } from "../v-utils/v-string-utils";
import "./master-details.css";
import { IRouteItem } from "../v-common/v-app";
import { INavItem, LayoutBodyNav } from "./v-layout";

interface MasterDetailsProps {
    routeItems: INavItem[],
    selected?: INavItem,
    onSelect: Function,
    contentRender: Function
}

interface MasterDetailsState {
    routeItems?: any,
    selected?: INavItem
}

export default class MasterDetails extends PureComponent<MasterDetailsProps, MasterDetailsState> {
    id = StringUtils.guid();
    constructor(props: any) {
        super(props);
        this.state = { routeItems: props.routeItems, selected: undefined }
    }

    onSelect = (item: INavItem) => {
        this.setState({ selected: item });
        this.props.onSelect(item);
    }

    renderItem = (item: INavItem, idx: number) => {
        let cName = "v-nav-item" + (item.name === this.state.selected?.name ? " v-selected" : "");         
        let cLabel = item.label ? item.label : StringUtils.t(item.name);
        return <div key={item.name} className={cName} onClick={(e: any) => { this.onSelect(item) }}>
            {cLabel}
        </div>
    }
    
    render = () => {
        return (
            <div className="v-master-details-browser">
                <div className="v-master-details-nav">
                   <LayoutBodyNav routeItems={this.props.routeItems} />
                </div>
                <div className="v-master-details-body" >
                    <div className="v-content" id={this.id}>
                        {
                            this.props.contentRender()
                        }
                    </div>
                </div>
            </div>
        )
    }
}