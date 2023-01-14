import { LayoutPage } from "../../../components/v-layout/v-layout";
import { getConfigs } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";

export const EmissionType = (props: any) => {
    const configs = getConfigs(); 

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} >
                 
            </LayoutPage >
        )
    }
    return ui();
}