
import { PureComponent } from 'react';
import { LayoutBodyNav, LayoutPage } from '../../components/v-layout/v-layout';
import { getConfigs } from '../../config/v-config';
import "./help.css"
import { StringUtils } from '../../components/v-utils/v-string-utils';
import { knowledgeApp } from './knowledge-app';

interface HelpState {
    topics?: any,
    selected?: any
}
export class Help extends PureComponent<{}, HelpState> {
    constructor(props: any) {
        super(props);
        let topics = getConfigs()["help-content"];
        this.state = { topics: topics ? topics : [], selected: undefined }
    }
    componentDidMount(): void {
        if (this.state.topics) {
            let s = this.state.topics[0];
            this.load(s.url);
            this.setState({
                selected: {
                    name: s.label,
                    route: s.url
                }
            })
        }
    }
    load = (url: string) => {
        StringUtils.loadContent("." + url).then((text) => {
            let ele = document.getElementById("v-help-content");
            if (ele) {
                ele.innerHTML = `${text}`;
            }
        });
    }
    onSelect = (topic: any) => {
        this.load(topic.route);
    }
    render = () => {
        return (
            <LayoutPage header={false} microApp={knowledgeApp} >
                <div className="v-body-nav">
                    <LayoutBodyNav routeItems={this.state.topics.map((s: any) => {
                        return {
                            name: s.label,
                            route: s.url
                        }
                    })
                    } onSelect={this.onSelect} selected={this.state.selected} />
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