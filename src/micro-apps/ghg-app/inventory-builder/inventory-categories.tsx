import { useState } from "react";

import { Form, Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DataTable } from "../../../components/v-table/v-table";
import { Action } from "../../../components/v-wizard";
import { greenHouseApp } from "../ghg-app";

export const MappingCategories = (props: any) => {
    const [filter, setFilter] = useState<string>("");
    const rawData = require("../../../config/us-sc-factors.json");

    const factors = {
        headers: rawData.headers.slice(0, 8),
        rows : rawData.rows.map((row : any) => {
            return {
                id : row.id,
                cols: row.cols.slice(0,8)
            }
        })
    }
    const handleSearch = (evt: any) => {
        setFilter(evt.target.value);
    }
    const ui = () => {
        let f = filter.toLowerCase();
        console.time("filter time");
        let data = {
            headers: factors.headers,
            rows: factors.rows.filter((row: any) => {
                let col: string = row.cols.map((col: any) => col.text).join(" ");
                return col.toLowerCase().includes(f);
            }).slice(0, 100)
        }
        console.timeEnd("filter time");
        console.log(data);
        return (
            <LayoutPage microApp={greenHouseApp}  >
                <Toast>
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            EPA Supply Chain Factor
                        </span>
                        <div><Form.Control type="text" onChange={handleSearch} />
                        </div>
                    </Toast.Header>
                    <Toast.Body>
                        <div className="big-table">
                            <DataTable data={data} />
                        </div>
                    </Toast.Body>
                    <Action
                        next={{ label: "Next", path: props.next }}
                        prev={{ label: "Back", path: props.prev }} />
                </Toast>
            </LayoutPage >
        )
    }
    return ui();
}
