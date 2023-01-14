import { LayoutPage } from "../../../components/v-layout";
import { getConfigs } from "../../../config/v-config";
import { greenHouseApp } from "../ghg-app";
 
export const EmissionFactorView = (props: any) => {
    var configs = getConfigs();
 
    const ui = () => {
        return (
            <LayoutPage microApp={greenHouseApp}  >
                
                
            </LayoutPage >
        )
    }
    return ui();
}