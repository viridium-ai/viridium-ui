import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, Question, updateQuestionnaire } from "../inventory-questionaire";
import { getConfigs, updateConfigs } from "../../../config/v-config";
import { StringUtils } from "../../../components/v-utils/v-string-utils";

export const Questionnaires = (props: any) => {
    const [questionnaire, setQuestionnaire] = useState<Questionnaire>(getQuestionnaire());
    const [selectedQuestion, selectQuestion] = useState("");
    const [addQuestion, setAddQuestion] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState<Array<Question>>([]);
    const [unselectedQuestions, setUnselectedQuestions] = useState<Array<Question>>([]);
    const [newName, setName] = useState<string>("");
    const [newNotes, setNotes] = useState<string>("");
    var configs = getConfigs();
    const questions: Array<Question> = configs.questions;
    
    useEffect(() => {
        setUnselectedQuestions(configs.questions);
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
    },[]);
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
        let q = { id: "q" + questions.length, name: newName, notes: newNotes };
        let qs = [...selectedQuestions];
        qs.push(q);
        questions.push(q);
        setName("");
        setNotes("");
        setSelectedQuestions(qs);
        configs.questions.push(q);
        updateConfigs(configs);
    }
    const onToggleAdd = () => {
        setAddQuestion(!addQuestion);
    }
    const addToList = () => {
        let q = unselectedQuestions.find(q => q.id === selectedQuestion);
        if (q) {
            let qs = [...selectedQuestions];
            qs.push(q);
            setSelectedQuestions(qs);
            setUnselectedQuestions([...unselectedQuestions.filter(q => q.id !== selectedQuestion)]);
            let clone = { ...questionnaire };
            clone.questions = [...qs];
            setQuestionnaire(clone);
            updateQuestionnaire(clone);
        }
    }
    const removeToList = (id: string) => {
        let q = selectedQuestions.find(q => q.id === id);
        if (q) {
            let qs = [...unselectedQuestions];
            qs.push(q);
            setUnselectedQuestions(qs);
            let ss = [...selectedQuestions.filter(q => q.id !== id)];
            setSelectedQuestions(ss);
            let clone = { ...questionnaire };
            clone.questions = [...ss];
            setQuestionnaire(clone);
            updateQuestionnaire(clone);
        }
    }
    const handleRemove = (evt: any) => {
        removeToList(evt.target.id);
    }

    const downloadData = () => {
        return StringUtils.download(JSON.stringify(questionnaire, undefined, 2), questionnaire.companyName, "application/json");
    }

    const ui = () => {
        return (
            <LayoutPage microApp={inventoryConfigApp} >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {questionnaire.companyName}
                        </span>
                        Viridium Industry:   {questionnaire.category}
                    </Toast.Header>
                    <Toast.Body>
                        <Row className="inventory-questions">
                            <Col sm={3} className="inventory-label">Select a Question
                            </Col>
                            <Col sm={8} className="v-summary">
                                <Form.Select value={selectedQuestion} onChange={onSelectQuestion} aria-label="">
                                    <option key={"type-" + 10} value={""}>Select a question to add</option>
                                    {
                                        unselectedQuestions.map((v, idx) =>
                                            <option key={"type-" + idx} value={"" + v.id}>{v.name}</option>
                                        )
                                    }
                                </Form.Select>
                            </Col>
                            <Col sm={1} style={{ textAlign: 'left' }} className="v-summary">
                                <Button style={{ minWidth: '1px', height: '36px', paddingTop: "4px", position: 'relative', left: '-40px' }} onClick={addToList}>+</Button>
                            </Col>
                        </Row>
                        <Row className="inventory-questions">
                            <Col sm={3} className="inventory-label">Selected Questions
                            </Col>
                            <Col sm={8} >
                                <div className="selected-questions">
                                    {selectedQuestions.map((v, idx) =>
                                        <Row className="selected-question" key={"type-" + idx}>
                                            <Col>{v.name}</Col><Col id={v.id} style={{ textAlign: "right", display: "inline-block", paddingRight: "10px" }} onClick={handleRemove}>x</Col></Row>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        {/* make the following offcanvas */}
                        <Row className="inventory-questions">
                            <Col sm={3} className="inventory-label">
                                <span onClick={onToggleAdd}>Add a Question</span>
                            </Col>
                            <Col sm={8} className="v-summary">
                                {addQuestion ? <div className="v-form">
                                    <Row>
                                        <Col className="v-summary">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control value={newName} type="text" onChange={onUpdateNewName} aria-label="">
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="v-summary">
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control value={newNotes} as="textarea" rows={3} onChange={onUpdateNewDesc} aria-label="">
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="v-summary">
                                            <Button onClick={addNew}>
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                </div> : ""
                                }
                            </Col>
                        </Row>
                        <Form.Group className="v-actions" controlId="formButtons">
                            <Button href={props.prev}>Back</Button> &nbsp;
                            <Button onClick={downloadData} >Download Questionnaire</Button>
                        </Form.Group>
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
    return ui();
}