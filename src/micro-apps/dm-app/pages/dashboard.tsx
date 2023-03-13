import { Row, Col, Toast, ProgressBar, Table } from 'react-bootstrap';
import { LayoutPage } from 'components/v-layout/v-layout'
import { QuickLine, QuickPie } from 'components/v-chart/v-quick-charts';
import { dataSourceManager } from '../dm-app';
import { DataTable } from 'components/v-table/v-table-1';
import { getConfigs } from 'config/v-config';
import "./dashboard.css";

export const Dashboard = (props: any) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const line_data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map((label, idx) => Math.floor(Math.random() * (1000 + 1) + 0)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map((label, idx) => Math.floor(Math.random() * (1000 + 1) + 0)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    const line_data_2 = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.floor(Math.random() * (1000 + 1) + 0)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => Math.floor(Math.random() * (1000 + 1) + 0)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const getSampleData = () => {
        return getConfigs().reportMockData;
    }
    const ui = () => {
        return (
            <LayoutPage microApp={dataSourceManager} pageName="dashboard" >
                <div slot="side-nav">
                    <Toast >
                        <Toast.Body className="v-list">
                            <div className="v-list-item">
                                Current Status
                            </div>
                            <div className="v-list-item">
                                Status YoY
                            </div >
                            <div className="v-list-item">
                                Activities
                            </div>
                            <div className="v-list-item">
                                Sources
                            </div>
                            <div className="v-list-item">
                                Scope
                            </div>
                        </Toast.Body>
                    </Toast>
                    <Toast >
                        <Toast.Header closeButton={false}>
                            Total Emissions
                        </Toast.Header>
                        <Toast.Body>
                            <div className="nav-chart-item">
                                <QuickLine options={options} data={line_data} />
                            </div >
                            <div className="v-list-item">
                                Sources
                            </div >
                            <div className="v-list-item">
                                Activities
                            </div>
                            <div className="v-list-item">
                                Scope
                            </div>
                        </Toast.Body>
                    </Toast>
                </div>
                < >
                    <div className="v-dashboard-panel">
                        <Toast >
                            <Toast.Header closeButton={false}>
                               Progress
                            </Toast.Header>
                            <Toast.Body>
                                <Row >
                                    <Col xs={3}>
                                        Acme Goal
                                    </Col>
                                    <Col xs={8}>
                                        <ProgressBar variant="warning" now={30} />
                                    </Col>
                                    <Col xs={1}>

                                    </Col>
                                </Row>
                                <Row >
                                    <Col xs={3}>
                                        Acme Special Project
                                    </Col>
                                    <Col xs={8}>
                                        <ProgressBar variant="warning" now={60} />
                                    </Col>
                                    <Col xs={1}>

                                    </Col>
                                </Row>
                                <Row >
                                    <Col xs={3}>
                                        Acme  Supply Chain Initiative
                                    </Col>
                                    <Col xs={8}>
                                        <ProgressBar variant="danger" now={80} />
                                    </Col>
                                    <Col xs={1}>

                                    </Col>
                                </Row>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="v-dashboard-panel">
                        <Row >
                            <Col>
                                <Toast >
                                    <Toast.Header closeButton={false}>
                                 Trend
                                    </Toast.Header>
                                    <Toast.Body>
                                        <Row >
                                            <Col>
                                                <div className="v-chart-item">
                                                    <QuickLine options={options} data={line_data_2} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Toast.Body>
                                </Toast>
                            </Col>
                            <Col>
                                <Toast >
                                    <Toast.Header closeButton={false}>
                                       Trend
                                    </Toast.Header>
                                    <Toast.Body>
                                        <Row>
                                            <Col className="v-sub-panel">
                                                <div className="v-pie-item">
                                                    <QuickPie options={options} data={data} />
                                                </div>
                                                <div>
                                                    Scope Distribution
                                                </div>
                                            </Col>
                                            <Col className="v-sub-panel">
                                                <div className="v-pie-item">
                                                    <QuickPie options={options} data={data} />
                                                </div>
                                                <div>
                                                    Process Distribution
                                                </div>
                                            </Col>
                                        </Row>
                                    </Toast.Body>
                                </Toast>
                            </Col>
                        </Row>
                    </div>
                    <div className="v-dashboard-panel">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                Emission
                            </Toast.Header>
                            <Toast.Body>
                                <DataTable data={getSampleData()} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </>
            </LayoutPage >
        )
    }
    return ui();
}
