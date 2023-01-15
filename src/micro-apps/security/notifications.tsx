import { useState } from "react";

import { Toast, Form, Row, Col, Button } from "react-bootstrap";
import { LayoutPage } from "../../components/v-layout/v-layout";
import { getConfigs } from "../../config/v-config";
import { securityApp } from "./security-app";

import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

type Notification = {
    id: string,
    date: string,
    from: string,
    to: string,
    subject: string,
    body: string,
    priority: string
}

function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export const NotificationView = (props: any) => {
    const configs = getConfigs();
    const [notification, setNotification] = useState<Notification>(configs.notifications[0]);
    const [notifications, setNotifications] = useState<Array<Notification>>(configs.notifications);
    const onSelectNotification = (evt: any) => {
        console.log(evt.target.id);
        let notification = notifications.find((n: Notification) => n.id === evt.target.id);
        if (notification) {
            setNotification(notification);
        }
    }
    const ui = () => {
        return (
            <LayoutPage microApp={securityApp} >
                <div className="v-body-nav">
                    <Toast >
                        <Toast.Body>
                            {
                                notifications.map((n) => {
                                    return <div className="v-list" key={n.id + 'k'} id={n.id} onClick={onSelectNotification}>{n.subject}</div>
                                })
                            }
                        </Toast.Body>
                    </Toast>
                </div>
                <div className="v-body-main">
                    <Toast >
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">{notification.subject} </strong>
                        </Toast.Header>
                        <Toast.Body>
                            <Row className="v-notification-meta">
                                <Col sm={4}>
                                    From: {notification.from}
                                </Col>
                                <Col sm={6}>on {notification.date}</Col>
                                <Col sm={2}>{notification.priority === "1" ? "High" : ""}</Col>
                            </Row>
                            <Row className="v-body">
                                <Col sm={12} className="v-notification-body">
                                    {lorem.generateParagraphs(2+Math.floor(Math.random() * 10)).split("\n").map((p, idx:number) => {
                                        return <p key={idx}>{p}</p>
                                    })}
                                </Col>
                            </Row>
                            <Row className="v-body">
                                <Col sm={8} >
                                </Col>
                                <Col style={{ textAlign: "right", padding: ".5em" }} sm={4} >
                                    <span className="v-button">Reply</span>
                                    <span className="v-button">Forward</span>
                                    <span className="v-button">Delete</span>
                                </Col>
                            </Row>
                        </Toast.Body>
                    </Toast>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}

