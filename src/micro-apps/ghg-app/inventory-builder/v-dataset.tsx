import { Component } from "react";
import { DataTable } from "../../../components/v-table/v-table";
import { getConfigs } from "../../../config/v-config";

type ViridiumDatasetProp = {

}
type ViridiumDatasetState = {

}
export class ViridiumDataset extends Component<ViridiumDatasetProp, ViridiumDatasetState> {
    constructor(props: ViridiumDatasetProp) {
        super(props);
        this.state = { connector: "1" }
    }

    render = () => {
        let data = getConfigs().reportMockData;
        return (
            <div className="v-container">
                <DataTable data={data} />
            </div>
        )
    };
}