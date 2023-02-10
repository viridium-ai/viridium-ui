import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { DataTable } from "../../../components/v-table/v-table";

type FileUploaderProps = {
    onReceiveData: Function,
    buttonTxt?: string
}
type FileUploaderState = {
    status: string,
    data: any
}
export class FileUploader extends Component<FileUploaderProps, FileUploaderState> {
    guid: string = crypto.randomUUID();
    constructor(props: FileUploaderProps) {
        super(props);
        this.state = { status: "Choose File", data: undefined }
    }

    csvToTableData = (text: string) => {
        let headers: Array<string> = [];
        let data: Array<Array<string>> = [];
        let lines = text.toString().split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const separate = line.includes("\t") ? "\t" : ",";
            if (i === 0) {
                headers = [...line.split(separate)];
            }
            else {
                data.push(line.split(separate));
            }
        }
        return {
            headers: headers.map((h) => { return { type: "text", text: h } }
            ),
            rows: data.map((r, idx: number) => { return { id: 'r' + idx, cols: r.map(c => { return { type: "text", text: c } }) } })
        };
    }
    onChooseFile = (evt: any) => {
        this.setState({ status: "Preview" });
    }

    doUpload = () => {
        let ele = document?.getElementById(this.guid);
        if (ele !== null) {
            let data = (ele as any).files[0];
            var fr = new FileReader();
            fr.onload = () => {
                let text = fr.result;
                if (text !== null) {
                    const data = this.csvToTableData(text.toString());
                    console.log(data);
                    if (this.state.status === "Preview") {
                        this.setState({ data: { ...data } });
                        this.setState({ status: "Mapping" });
                    }
                    if (this.state.status === "Import") {
                        this.props.onReceiveData(fr.result);
                        this.setState({ status: "Choose File" });
                        this.setState({ data: undefined });
                        (ele as any).value = null;
                    }
                }
            }
            fr.readAsText(data);
        }
    }
    onValueChange = (v: any) => {
        console.log(v.target.value, v.target.id);
    }
    onScopeChange = (v: any) => {
        console.log(v.target.value, v.target.id);
    }
    mappingData = () => {
        let newRows = this.state.data.rows.map((r: any, idx: number) => {
            return {
                cols: [...r.cols,
                ]
            }
        })
        let mappingData = {
            headers: [...this.state.data.headers],
            rows: newRows
        }
        console.log(mappingData);
        return <DataTable data={mappingData} options={{ show: 3 }} />
    }
    preview = () => {
        return this.state.data ? <DataTable data={this.state.data} options={{ show: 3 }} /> : ""
    }
    render = () => {
        return (
            <div className="v-container">
                <Form.Group className="mb-3">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control id={this.guid} type="file" onChange={this.onChooseFile} />
                </Form.Group>
                <Form.Group className="connector-config-form-btns">
                    <Button disabled={this.state.status === "Choose File"} variant="light" onClick={this.doUpload} name="submit">{this.state.status}</Button>
                </Form.Group>
                <div className="preview-container">
                    {
                        this.state.status === "Mapping" ? this.mappingData() : this.state.status === "Preview" ? this.preview() : ""
                    }
                </div>

            </div>
        )
    };
}
