import { LayoutPage } from "../../../components/layout";
import { getConfigs } from "../../../config/viridium-config";
import { greenHouseApp } from "../ghg-app";
 
export const EmissionFactorView = (props: any) => {
    var configs = getConfigs();
 
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp} withAppHeader={true} >
                
                
            </LayoutPage >
        )
    }
    return ui();
}