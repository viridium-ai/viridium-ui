import { Toast } from "react-bootstrap";
import { Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DataTable, Filter } from "../../../components/v-table/v-table";

import { greenHouseApp } from "../ghg-app";

export const MappingCategories = (props: any) => {
    const rawData = require("../../../config/us-sc-factors.json");

    const factors = {
        headers: rawData.headers.slice(0, 8),
        rows: rawData.rows.map((row: any) => {
            return {
                id: row.id,
                cols: row.cols.slice(0, 8)
            }
        })
    }

    const getFilters = (): Array<Filter> => {
        return [
            { name: "Name", value: "raw" },
            {
                name: "Year", value: "2011", options: [
                    "", "2010", "2011", "2012", "2013", "2014", "2015", "2016"
                ].map((y) => {
                    return { name: y, label: y.length===0? "All Years" : y, value: y }
                })
            },
            { name: "Type", value: "Commodity",  options: [
                "", "Commodity", "Industry"
            ].map((y) => {
                return { name: y, label: y.length===0? "All Types" : y, value: y }
            })},
        ]
    }
    const handleSelect = (rowId:string, row: any) => {
        console.log(row);
    }
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp}  >
                <Toast>
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            EPA Supply Chain Factor
                        </span>
                    </Toast.Header>
                    <Toast.Body className="big-table">
                        <DataTable columns={["Name", "Substance", "Unit", "Factor"]} filters={getFilters()} data={factors} onSelectRow={handleSelect} />
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
