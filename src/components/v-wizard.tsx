import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
 
export const Question = (props: any) => {
    const ui = () => {
        return (
                <Form.Group as={Row} className="v-form-row" controlId={props.id}>
                    <Form.Label className="v-form-label" column sm="3">{props.label}</Form.Label>
                    <Col className="v-form-input" sm="9">
                        {props.children}
                    </Col>
                </Form.Group>
        )
    }
    return ui();
}

export const Action = (props: any) => {
    const navigate = useNavigate();
    const handlePrevAction = (evt: any) => {
        if(props.onPrev) {
            props.onPrev();
        }
        navigate(`${props.prev.path}`);
    }

    const handleNextAction = (evt: any) => {
        if(props.onNext) {
            props.onNext();
        }
        navigate(`${props.next.path}`);
    }

    const ui = () => {
        return (
            <div className="v-actions" >
                <Form.Group >
                    {props.prev ? <Button className="v-button" onClick={handlePrevAction}>
                        {props.prev.label}
                    </Button> : ""}
                    &nbsp;
                    {props.next ? <Button className="v-button" onClick={handleNextAction} >
                        {props.next.label}
                    </Button> : ""}
                </Form.Group>
            </div>
        )
    }
    return ui();
}
