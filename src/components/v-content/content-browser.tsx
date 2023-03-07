import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { LayoutBodyNav } from "../v-layout/v-layout";
import { StringUtils } from "../v-utils/v-string-utils";
import "./content-browser.css";

interface Topic {
    title: string;
    summary?: string;
    url: string;
    img?: string
}

interface ContentBrowserProps {
    topics: Array<Topic>,
    selected?: any
}

interface ContentBrowserState {
    topics: Array<Topic>,
    selected?: any
}

export default class ContentBrowser extends PureComponent<ContentBrowserProps, ContentBrowserState> {
    id = StringUtils.guid();
    constructor(props: any) {
        super(props);
        this.state = { topics: props.topics, selected: undefined }
    }

    componentDidMount(): void {
        if (this.state.topics) {
            let s = this.state.topics[0];
            this.load(s.url);
            this.setState({
                selected: {
                    name: s.title,
                    route: s.url
                }
            })
        }
    }

    load = (url: string) => {
        StringUtils.loadContent("." + url).then((text) => {
            let ele = document.getElementById(this.id);
            if (ele) {
                ele.innerHTML = `${text}`;
            }
        });
    }

    onSelect = (topic: any) => {
        this.load(topic.route);
    }

    sideNav = () => {
        return (
            <div className="v-content-browser">
                <div className="v-content-nav">
                    <LayoutBodyNav routeItems={this.state.topics.map((s: any) => {
                        return {
                            name: s.title,
                            route: s.url
                        }
                    })
                    } onSelect={this.onSelect} selected={this.state.selected} />
                </div>
                <div className="v-content-body" >
                    <div className="v-content" id={this.id}>
                        Please select a topic from the right menu
                    </div>
                </div>
            </div>
        )
    }

    renderTopic = (topic: Topic, idx: number) => {
        return (
            <div key={`idx-` + idx} className="v-content-topic">
                <div>
                    {topic.summary}
                </div>
                {topic.img ? <img src={topic.img} /> : ""
                }
                <Link to={topic.url} >{topic.title}</Link>
            </div>
        )
    }

    topicNav = () => {
        return (
            <div className="v-blog-topics">
                {
                    this.state.topics.map((s: any, idx: number) => this.renderTopic(s, idx))
                }
            </div>
        )
    }

    render = () => {
        return this.topicNav()
    }
}