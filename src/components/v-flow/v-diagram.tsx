import { PureComponent } from "react";
import { Diagram } from "./diagram";
import "./v-diagram.css";

const SHAPES = [{ value: "1", name: "Rectangle" },
{ value: "2", name: "Circle" },
{ value: "3", name: "Curve" },
{ value: "4", name: "Line" }
];

interface DiagramPageState {
    mode: string
}
export class DiagramCanvas extends PureComponent<any, DiagramPageState> {
    diagram: Diagram = new Diagram();
    constructor(props: any) {
        super(props);
        this.state = { mode: "1" };
    }

    resizeCanvas() {
        this.diagram.canvas.width = window.innerWidth;
        this.diagram.canvas.height = window.innerHeight - 100;
        this.diagram.draw();
    }

    componentDidMount() {
        this.diagram.observe("diagram_canvas");
        this.resizeCanvas();
        window.addEventListener("resize", () => {
            this.resizeCanvas();
        });
    }

    componentWillUnmount(): void {

    }
    render = () => {
        return (
            <div className="v-diagram">
                <div className="v-diagram-tools v-flex">
                    <div className="v-flex">
                        {SHAPES.map((shape, idx) => {
                            const selected = this.state.mode === shape.value;
                            return (
                                <span className={`v-icon-button ${selected?'v-selected' : ''}`} 
                                    key={idx} id={`tool-${idx}`} onClick={() => {
                                    this.diagram.mode = shape.value;
                                    this.setState({ mode: shape.value });
                                }} >
                                    {shape.name}
                                </span>
                            )
                        }
                        )}
                    </div>
                    <div className="v-flex v-flex-right">
                        <span className="v-icon-button" id="btn-clear" onClick={this.diagram.clear} >Clear All</span>
                        <span className="v-icon-button" id="btn-delete" onClick={this.diagram.delete} >Delete Selected</span>
                    </div>
                </div>
                <div>
                    <canvas id="diagram_canvas" width="800" height="600" > </canvas>
                </div>
            </div>
        )
    }
}