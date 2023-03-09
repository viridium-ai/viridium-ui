import { PureComponent } from "react";
import { Button, Col, Form, Row, Toast } from "react-bootstrap";
import { LayoutPage } from "components/v-layout/v-layout";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, Question, updateQuestionnaire } from "../inventory-questionnaire";
import { getConfigs, updateConfigs } from "config/v-config";
import { ExcelUtils, StringUtils } from "components/v-utils/v-string-utils";
import { BiTrash } from "react-icons/bi";
import { VscAdd } from "react-icons/vsc";
import { Action } from "components/v-flow/wizard";
interface QuestionsState {
    questionnaire: Questionnaire,
    selectedQuestion?: string,
    addQuestion: boolean,
    selectedQuestions: Array<Question>,
    unselectedQuestions: Array<Question>,
    newName: string,
    newNotes: string,
}
export class Questionnaires extends PureComponent<any, QuestionsState> {
    questions: Array<Question>;
    constructor(props: any) {
        super(props);
        let configs = getConfigs();
        this.questions = configs.questions;
        let questionnaire = getQuestionnaire();

        this.state = {
            questionnaire: questionnaire,
            selectedQuestion: "",
            addQuestion: false,
            selectedQuestions: questionnaire.questions,
            unselectedQuestions: this.selectNotIn(questionnaire.questions, this.questions),
            newName: "",
            newNotes: ""
        }
    }

    selectNotIn = (a1: Array<Question>, total: Array<Question>) => {
        let selectedIds = a1.map((q) => q.id);
        return total.filter((q) => {
            return !selectedIds.includes(q.id);
        });
    }

    onSelectQuestion = (evt: any) => {
        this.setState({ selectedQuestion: evt.target.value })
    }
    onUpdateNewName = (evt: any) => {
        this.setState({ newName: evt.target.value })
    }
    onUpdateNewDesc = (evt: any) => {
        this.setState({ newNotes: evt.target.value })
    }

    addNew = () => {
        let questions = this.questions
        let q = { id: "q" + questions.length, name: this.state.newName, notes: this.state.newNotes };
        let qs = [...this.state.selectedQuestions];
        qs.push(q);
        questions.push(q);
        this.setState({
            newName: "",
            newNotes: "",
            selectedQuestions: qs
        })
        let configs = getConfigs();
        this.questions = configs.questions;
        questions.push(q);
        updateConfigs(configs);
    }

    onToggleAdd = () => {
        this.setState({ addQuestion: !this.state.addQuestion })
    }

    addToList = () => {
        let unselectedQuestions = this.state.unselectedQuestions;
        let selectedQuestion = this.state.selectedQuestion;
        let q = unselectedQuestions.find(q => q.id === selectedQuestion);
        if (q) {
            let qs = [...this.state.selectedQuestions];
            qs.push(q);
            let clone = { ...this.state.questionnaire };
            clone.questions = [...qs];
            this.setState({
                selectedQuestions: qs,
                unselectedQuestions: [...unselectedQuestions.filter(q => q.id !== selectedQuestion)],
                questionnaire: clone
            });
            updateQuestionnaire(clone);
        }
    }
    removeToList = (id: string) => {
        let q = this.state.selectedQuestions.find(q => q.id === id);
        if (q) {
            let qs = [...this.state.unselectedQuestions];
            qs.push(q);
            let ss = [...this.state.selectedQuestions.filter(q => q.id !== id)];
            let clone = { ...this.state.questionnaire };
            clone.questions = [...ss];

            this.setState({
                selectedQuestions: ss,
                unselectedQuestions: qs,
                questionnaire: clone
            });
            updateQuestionnaire(clone);
        }
    }
    handleRemove = (evt: any) => {
        this.removeToList(evt.currentTarget.id);
    }

    downloadData = () => {
        let questionnaire = this.state.questionnaire;
        let q = new Questionnaire();
        Object.assign(q, questionnaire);
         
        let csv = q.toTsv().join("\n");
        return StringUtils.download(csv, questionnaire.companyName + ".tsv", "application/csv");
    }

    render = () => {
        let questionnaire = this.state.questionnaire;
        let selectedQuestion = this.state.selectedQuestion;
        let unselectedQuestions = this.state.unselectedQuestions;
        let selectedQuestions = this.state.selectedQuestions;
        return (
            <LayoutPage microApp={inventoryConfigApp} >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <span className="me-auto">
                            {questionnaire.companyName}
                        </span>
                        Template:   {StringUtils.t(questionnaire.templateName)}
                    </Toast.Header>
                    <Toast.Body>
                        <Row className="v-questions">
                            <Col sm={3} className="v-question-label">Select a Question
                            </Col>
                            <Col sm={8} >
                                <div className="v-flex">
                                    <Form.Select value={selectedQuestion} onChange={this.onSelectQuestion} >
                                        <option key={"type-" + 10} value={""}>Select a question to add</option>
                                        {
                                            unselectedQuestions.map((v, idx) =>
                                                <option key={"type-" + idx} value={"" + v.id}>{v.name}</option>
                                            )
                                        }
                                    </Form.Select>
                                    <span className="v-icon-button" onClick={this.addToList}><VscAdd />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm={3} className="v-question-label">Selected Questions
                            </Col>
                            <Col sm={8} >
                                {selectedQuestions.map((v, idx) =>
                                    <div className="v-flex" key={"type-" + idx}>
                                        <span className="me-auto"> {v.name} </span>
                                        <span className="v-icon-button" id={v.id} onClick={this.handleRemove}>
                                            <BiTrash />
                                        </span>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        {/* make the following offcanvas */}
                        <Row >
                            <Col sm={3} className="inventory-label">
                                <span className='v-icon-button' onClick={this.onToggleAdd}>Add a Question  <VscAdd /></span>
                            </Col>
                            <Col sm={8} className="v-summary">
                                {this.state.addQuestion ? <div className="v-form">
                                    <Row>
                                        <Col className="v-summary">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control value={this.state.newName} type="text" onChange={this.onUpdateNewName} aria-label="">
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="v-summary">
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control value={this.state.newNotes} as="textarea" rows={3} onChange={this.onUpdateNewDesc} aria-label="">
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="v-summary">
                                            <span className="v-icon-button" onClick={this.addNew}>
                                                Add
                                            </span>
                                        </Col>
                                    </Row>
                                </div> : ""
                                }
                            </Col>
                        </Row>
                        <div className="v-footer v-flex">
                            <Action prev={{ label: "Back", path: this.props.prev }} />
                            <Button onClick={this.downloadData} >Download Questionnaire</Button>
                        </div>
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }
}