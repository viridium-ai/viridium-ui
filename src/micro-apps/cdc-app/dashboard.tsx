import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Row, Col, Toast, ProgressBar, Table } from 'react-bootstrap';
import { LayoutPage } from '../../common/layout'
import { carbonApp } from './cdc-app';

import {
    Chart as ChartJS, ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title, Tooltip, Legend
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';


import { securityManager } from '../../common/security/security-manager';

ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

/**
 * Main page for a user profile.
 * 
 * @param props 
 * @returns 
 */
export const Dashboard = (props: any) => {
    const navigate = useNavigate();
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

    useEffect(() => {
        if(!securityManager.isSignedIn()) {
            console.log("redirect to login");
            navigate("/login");
        }
    }, [])

    const ui = () => {
        return (
            <LayoutPage microApp={carbonApp} withAppHeader={true} >
                <div className="home-body">
                    <div className="home-body-nav">
                        <Toast >
                            <Toast.Body>
                                <div className="item">
                                    Current Status
                                </div>
                                <div className="item">
                                    Status YoY
                                </div >
                                <div className="item">
                                    Activities
                                </div>
                                <div className="item">
                                    Sources
                                </div>
                                <div className="item">
                                    Scope
                                </div>
                            </Toast.Body>
                        </Toast>
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Total Emissions</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <div className="nav-chart-item">
                                    <Line options={options} data={line_data} />
                                </div >
                                <div className="item">
                                    Sources
                                </div >
                                <div className="item">
                                    Activities
                                </div>
                                <div className="item">
                                    Scope
                                </div>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <div className="home-body-main">
                        <div className="dashboard-panel">
                            <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Progress</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Row >
                                        <Col xs={2}>
                                            Acme Goal
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="warning" now={30} />
                                        </Col>
                                        <Col xs={1}>

                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col xs={2}>
                                            Acme Special Project
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="warning" now={60} />
                                        </Col>
                                        <Col xs={1}>

                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col xs={2}>
                                            Acme  Supply Chain Initiative
                                        </Col>
                                        <Col xs={9}>
                                            <ProgressBar variant="danger" now={80} />
                                        </Col>
                                        <Col xs={1}>

                                        </Col>
                                    </Row>
                                </Toast.Body>
                            </Toast>
                        </div>
                        <div className="dashboard-panel">
                            <div>
                                <Row >
                                    <Col>
                                        <Toast >
                                            <Toast.Header closeButton={false}>
                                                <strong className="me-auto">Trend</strong>
                                            </Toast.Header>
                                            <Toast.Body>
                                                <Row >
                                                    <Col>
                                                        <div className="panel-chart-item">
                                                            <Line options={options} data={line_data_2} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Toast.Body>
                                        </Toast>
                                    </Col>
                                    <Col>
                                        <Toast >
                                            <Toast.Header closeButton={false}>
                                                <strong className="me-auto">Trend</strong>
                                            </Toast.Header>
                                            <Toast.Body>
                                                <Row className="pie-charts-container">
                                                    <Col className="sub-panel">
                                                        <div className="panel-pie-item">
                                                            <Pie options={options} data={data} />
                                                        </div>
                                                        <div>
                                                            Scope Distribution
                                                        </div>
                                                    </Col>
                                                    <Col className="sub-panel">
                                                        <div className="panel-pie-item">
                                                            <Pie options={options} data={data} />
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
                        </div>
                        <div className="dashboard-panel">
                            <Toast >
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Emission</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Progress</th>
                                                <th>tCO2e</th>
                                                <th>Scope</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                                <td >Larry the Bird</td>
                                                <td>Thornton</td>
                                                <td>@twitter</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Toast.Body>
                            </Toast>
                        </div>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}
