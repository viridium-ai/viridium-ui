import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LayoutPage } from "../../../components/layout";
import { securityManager } from "../../../common/security/security-manager";
import { Action } from "../../../components/wizard";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, Question, updateQuestionnaire } from "../inventory-common";

export const Questionnaires = (props: any) => {

    const [report, setQuestionnaire] = useState<Questionnaire>(getQuestionnaire());
    const [selectedQuestion, selectQuestion] = useState("");
    const [selectedQuestions, setSelectedQuestions] = useState<Array<Question>>([]);
    const [unselectedQuestions, setUnselectedQuestions] = useState<Array<Question>>([]);
    const [newName, setName] = useState<string>("");
    const [newNotes, setNotes] = useState<string>("");
    const navigate = useNavigate();

    var configs = require('./configs.json');

    const questions: Array<Question> = configs.questions;
    useEffect(() => {
        setUnselectedQuestions(configs.questions);
        if (!securityManager.isSignedIn()) {
            console.log("redirect to login");
            navigate("/login?from=/inventory-app");
        } else {
            let r = getQuestionnaire();
            if (r) {
                setQuestionnaire(r);
                if (r.questions) {
                    setSelectedQuestions(r.questions);
                    setUnselectedQuestions(questions.filter((q) => {
                        return r.questions.find((sq) => sq.id === q.id) === undefined;
                    }));
                }
            }
        }
    }, [questions, navigate, configs.questions]);


    const onSelectQuestion = (event: any) => {
        selectQuestion(event.target.value);
    }

    const onUpdateNewName = (evt: any) => {
        setName(evt.target.value);
    }

    const onUpdateNewDesc = (evt: any) => {
        setNotes(evt.target.value);
    }

    const addNew = () => {
        let q = { id: "test" + questions.length, name: newName, notes: newNotes };
        let qs = [...selectedQuestions];
        qs.push(q);
        questions.push(q);
        setName("");
        setNotes("");
        setSelectedQuestions(qs);
    }

    const addToList = () => {
        let q = unselectedQuestions.find(q => q.id === selectedQuestion);
        if (q) {
            let qs = [...selectedQuestions];
            qs.push(q);
            setSelectedQuestions(qs);
            setUnselectedQuestions([...unselectedQuestions.filter(q => q.id !== selectedQuestion)]);
            let clone = { ...report };
            clone.questions = [...qs];
            setQuestionnaire(clone);
            updateQuestionnaire(clone);
        }
    }

    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <span className="me-auto">
                                    {report.companyName}
                                </span>
                                Viridium Industry:   {report.category}
                            </Toast.Header>
                            <Toast.Body>
                                <Row className="inventory-questions">
                                    <Col sm={3} className="inventory-summary">Select Question:
                                    </Col>
                                    <Col sm={8} className="inventory-summary">
                                        <Form.Select value={selectedQuestion} onChange={onSelectQuestion} aria-label="">
                                            <option key={"type-" + 10} value={""}>Select a question to add</option>
                                            {
                                                unselectedQuestions.map((v, idx) =>
                                                    <option key={"type-" + idx} value={"" + v.id}>{v.name}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Col sm={1} className="inventory-summary">
                                        <Button onClick={addToList}>
                                            +
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="inventory-questions">
                                    <Col sm={3} className="inventory-summary">Selected Questions:
                                    </Col>
                                    <Col sm={8} className="inventory-summary">
                                        <div className="selected-questions">
                                            {selectedQuestions.map((v, idx) =>
                                                <div className="selected-question" key={"type-" + idx}>{v.name}</div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                {/* make the following offcanvas */}
                                <Row className="inventory-questions">
                                    <Col sm={3} className="inventory-summary">
                                        Add a Question:
                                    </Col>
                                    <Col sm={8} className="inventory-summary">
                                        <div className="new-question-form">
                                            <Row>
                                                <Col className="inventory-summary">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control value={newName} type="text" onChange={onUpdateNewName} aria-label="">
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="inventory-summary">
                                                    <Form.Label>Notes</Form.Label>
                                                    <Form.Control value={newNotes} as="textarea" rows={3} onChange={onUpdateNewDesc} aria-label="">
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="inventory-summary">
                                                    <Button onClick={addNew}>
                                                        Add
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Action
                                    prev={{ label: "Back", path: "/inventory-app/sources" }}
                                    next={{ label: "Download Questionnaire", path: "/inventory-app/save" }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}