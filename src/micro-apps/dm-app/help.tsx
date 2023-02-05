
import { PureComponent } from 'react';
import { Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout/v-layout';
import { getConfigs } from '../../config/v-config';
import { StringUtils } from '../../utils/v-string-utils';
import { dataSourceManager } from './dm-app';

interface HelpState {
    content: string;
    title: string
}
export class Help extends PureComponent<{}, HelpState> {
    constructor(props: any) {
        super(props);
        this.state = { content: "Please select a topic on the left menu", title: "No content" }
    }
    onSelect = (contentId: string, idx: number) => {
        StringUtils.loadContent("." + contentId).then((text) => {
            //this.setState({ content: text });
            let ele = document.getElementById("v-help-content");
            if (ele) {
                ele.innerHTML = `${text}`;
            }
        })
        this.setState({content:contentId});
        this.forceUpdate();
    }
    render = () => {

        return (
            <LayoutPage microApp={dataSourceManager} >
                <div className="v-body-nav">
                    <div className="v-list">
                        {
                            getConfigs()["help-content"]?.map((s: any, idx: number) => {
                                return <div key={s + " " + idx} className="v-list-item" onClick={(evt: any) => { this.onSelect(s.url, idx) }} >{s.label}</div>
                            })
                        }
                    </div>
                </div>
                <div className="v-body-main" id={this.state.content}>
                    <div className="v-help-content" id="v-help-content">
                        Please select a topic from the right menu
                    </div>
                </div>
            </LayoutPage >
        )
    }
}