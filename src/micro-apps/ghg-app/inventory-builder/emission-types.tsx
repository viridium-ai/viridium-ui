import { LayoutPage } from "../../../components/layout";
import { getConfigs } from "../../../config/viridium-config";
import { greenHouseApp } from "../ghg-app";

export const EmissionType = (props: any) => {
    const configs = getConfigs(); 

    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                 
            </LayoutPage >
        )
    }
    return ui();
}