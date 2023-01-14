import { LayoutPage } from '../../components/v-layout/v-layout';
import { homeApp } from './home-app';

export const WelcomePage = (props: any) => {

    const ui = () => {
        return (
            <LayoutPage microApp={homeApp}>
                <div className="welcome-page">
                    <div className="welcome-content">
                        <div className="welcome-splash">
                            Data Cloud for Environmental<br />
                            Sustainability
                        </div>
                    </div>
                </div>
               
            </LayoutPage>
        )
    }
    return ui();
}


