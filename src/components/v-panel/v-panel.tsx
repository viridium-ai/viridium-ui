import { PureComponent } from "react";
import { VscClose, VscInfo } from "react-icons/vsc";
import "./v-panel.css";

type PanelProps = {
    className?: string,
    style?: any,
    title: string,
    modal?: boolean,
    children?: any,
    closable?: boolean;
    onClose?: Function
    hasInfo?: boolean;
}

type PanelState = {
    show: boolean
}

export class Panel extends PureComponent<PanelProps, PanelState> {
    constructor(props: PanelProps) {
        super(props);
        this.state = { show: false };
    }

    handleClose = () => {
        this.setState({ show: false });
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    render = () => {
        return (
            <div className="v-panel">
                <div className="v-panel-header">
                    <span className="v-panel-title">{this.props.title}</span>
                    <span className="v-panel-tools">
                        {
                            this.props.closable ? <span className="v-icon-button" onClick={this.handleClose}><VscClose /></span> : ""
                        }
                        {
                            this.props.hasInfo ? <span className="v-icon-button" onClick={this.handleClose}><VscInfo /></span> : ""
                        }
                    </span>
                </div>
                <div className="v-panel-body">
                    {
                        this.props.children
                    }
                </div>
                <div className="v-panel-footer">
                </div>
            </div>
        )
    }
}