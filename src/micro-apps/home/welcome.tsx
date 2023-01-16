import { LayoutPage } from '../../components/v-layout/v-layout';
import { homeApp } from './home-app';

export const WelcomePage = (props: any) => {

    const ui = () => {
        return (
            <LayoutPage microApp={homeApp}>
                <div className="home-page">
                    <div className="home-content">
                        <div className="home-splash">
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


