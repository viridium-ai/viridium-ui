
import { PureComponent } from 'react';
import { LayoutPage } from '../../components/v-layout/v-layout';
import { getConfigs } from '../../config/v-config';
import { StringUtils } from '../../utils/v-string-utils';
import { homeApp } from './home-app';
import "./help.css"

interface HelpState {
    selected: number;
    topics?:any
}
export class Help extends PureComponent<{}, HelpState> {
    constructor(props: any) {
        super(props);
        let topics = getConfigs()["help-content"];
        this.state = { selected: topics?topics.length  - 1 : -1, topics : topics ? topics : []}
    }
    componentDidMount(): void {
        if (this.state.topics) {
            this.load(this.state.topics[0].url);
            this.setState({selected:0});
        }
    }
    load = (url : string) =>{
        StringUtils.loadContent("." + url).then((text) => {
            let ele = document.getElementById("v-help-content");
            if (ele) {
                ele.innerHTML = `${text}`;
            }
        });
    }
    onSelect = (url: string, idx: number) => {
        this.setState({ selected : idx });
        this.load(url);
    }
    render = () => {
        return (
            <LayoutPage header={false} microApp={homeApp} >
                    <div className="v-body-nav">
                        <div className="v-list">
                            {
                                this.state.topics.map((s: any, idx: number) => {
                                    let selected = this.state.selected === idx;
                                    return <div key={s + " " + idx} className= {"v-list-item" + (selected ? " selected" : "") } 
                                        onClick={(evt: any) => { this.onSelect(s.url, idx) }} >{s.label}</div>
                                })
                            }
                        </div>
                    </div>
                    <div className="v-body-main" >
                        <div className="v-help-content" id="v-help-content">
                            Please select a topic from the right menu
                        </div>
                    </div>
            </LayoutPage >
        )
    }
}