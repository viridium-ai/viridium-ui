import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, NavLink } from "react-bootstrap";
import { Route, useNavigate, useSearchParams } from "react-router-dom";

import { LayoutPage } from "../../components/v-layout/v-layout";
import { securityManager, UserContextType, UserContext, LoginObject } from "../../common/security/v-security-manager";
import './security-app.css';
import { HomeApp, homeApp } from "../home/home-app";
import { EntityDetails } from "../service-browser/service-component";
import { NotificationView } from "./notifications";

class SecurityApp extends HomeApp {
    public getName = () => {
        return "security-app";
    }
    public getTitle = (): string => {
        return "Security";
    }
    public isSecure = (): boolean => {
        return true;
    }

    getHeader = (): any => {
        return {
            title: this.getTitle(),
            visible: true
        };
    }
    public getRoutes = () => {
        return (
            <>
                <Route path={`/login`} element={<LoginForm />} />
                <Route path={`/signup`} element={<SignupForm />} />
                <Route path={`/signout`} element={<SignOutForm />} />
                <Route path={`/security-app`} element={<ProfileManager />} />
                <Route path={`/security-app/profile`} element={<ProfileManager />} />
                <Route path={`/security-app/notifications`} element={<NotificationView />} />
            </>
        )
    }
}

export const SignOutForm = (props: any) => {
    const navigate = useNavigate();
    setTimeout(() => {
        securityManager.signout();
        navigate("/", { replace: true });
    }, 2000);

    const ui = () => {
        return (
            <LayoutPage microApp={securityApp} >
                <div className="v-body-main">
                    <div className="v-signout-main">
                            Thanks You, 
                            <br/>
                            Redirect to home in momentarily.
                    </div>
                </div>
            </LayoutPage>
        )
    }

    return ui();
}


export const LoginForm = (props: any) => {
    let messageForm: any = undefined;
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '',
        password: '',
        message: ''
    })

    let [searchParams] = useSearchParams();

    const submit = (ctxValue: UserContextType) => {
        let user = state as LoginObject;
        securityManager.signin(user).then((res) => {
            if (res.status !== 200) {
                throw Error(res.statusText);
            }
            return res.user;
        }).then((user) => {
            let from = searchParams.get("from");
            if (from === null) {
                from = "/"
            }
            navigate(from, { replace: true });
            reset();
        }).catch(error => {
            user.message = 'Failed to sign in, please try again';
            user.password = '';
            user.username = '';
            setState({ ...user });
        });
    }

    const reset = () => {
        setState({
            username: '',
            password: '',
            message: ''
        });
        messageForm?.reset();

    }

    const ui = () => {
        return (
            <UserContext.Consumer>
                {
                    ctxValue => {
                        return <LayoutPage microApp={homeApp} >
                            <div id="security-app" className="security-app">
                                <Container className='v-form'>
                                    <Row className='v-header' >
                                        <Col className="v-title">
                                            Sign In
                                        </Col>
                                    </Row>
                                    <Row className='v-body'>
                                        <Form ref={(form: any) => messageForm = form} onSubmit={(event) => {
                                            event.preventDefault();
                                            submit(ctxValue);
                                        }}>
                                            <Form.Group className="mb-3" controlId="username">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="name"
                                                    value={state.username}
                                                    onInput={(e: any) => {
                                                        let newUser = { ...state };
                                                        newUser.username = e.target.value;
                                                        setState(newUser);
                                                    }}
                                                    placeholder="Username" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password"
                                                    value={state.password}
                                                    onInput={(e: any) => {
                                                        let newUser = { ...state };
                                                        newUser.password = e.target.value;
                                                        setState(newUser);
                                                    }}
                                                    placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group className="v-buttons" >
                                                <Button variant="primary" type="submit">
                                                    Sign in
                                                </Button>{' '}
                                                <Button variant="secondary" onClick={reset}>
                                                    Reset
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row className='v-footer'>
                                        <Col className='v-link'>
                                            <NavLink as="a" href="/signup">Don't have account yet?</NavLink>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className='warning-box' >
                                            <Alert show={state.message !== ''} variant='danger'>
                                                {state.message}
                                            </Alert>
                                        </div>
                                    </Row>
                                </Container>
                            </div>
                        </LayoutPage>
                    }
                }
            </UserContext.Consumer>
        )
    }

    return ui();
}

export const SignupForm = (props: any) => {
    let messageForm: any = undefined;
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '',
        password: '',
        password2: '',
        message: ''
    });

    const signupAction = (ctxValue: UserContextType) => {
        let user = state as LoginObject;
        if (user.password !== user.password2) {
            let newState = { ...state };
            newState.message = 'Passwords does not match';
            setState(newState);
            return;
        }

        securityManager.signup(user).then((res) => {
            if (res.status !== 200) {
                throw Error(res.statusText);
            }
            return res.user;
        }).then((user) => {
            navigate("/login", { replace: true });
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            reset();
        })
    }

    const reset = () => {
        setState({
            username: '',
            password: '',
            password2: '',
            message: ''
        });
        messageForm?.reset();
    }

    const ui = () => {
        return (
            <UserContext.Consumer>
                {
                    ctxValue => {
                        return <LayoutPage microApp={homeApp} >
                            <div id="signup-app" className="security-app">
                                <Container className='v-form'>
                                    <Row className='v-header'>
                                        <Col className='v-title'>
                                            Sign Up
                                        </Col>
                                    </Row>
                                    <Row className='v-body'>
                                        <Form ref={(form: any) => messageForm = form} onSubmit={(event) => {
                                            event.preventDefault();
                                            signupAction(ctxValue);
                                        }}>
                                            <Form.Group className="mb-3" controlId="username">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="name"
                                                    value={state.username}
                                                    onInput={(e: any) => {
                                                        let newUser = { ...state };
                                                        newUser.username = e.target.value;
                                                        setState(newUser);
                                                    }}
                                                    placeholder="Username" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password"
                                                    value={state.password}
                                                    onInput={(e: any) => {
                                                        let newUser = { ...state };
                                                        newUser.password = e.target.value;
                                                        setState(newUser);
                                                    }}
                                                    placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="password">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" value={state.password2}
                                                    onInput={(e: any) => {
                                                        let newUser = { ...state };
                                                        newUser.password2 = e.target.value;
                                                        setState(newUser);
                                                    }}
                                                    placeholder="Retry Password" />
                                            </Form.Group>

                                            <Form.Group className="v-buttons" >
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>{' '}
                                                <Button variant="secondary" onClick={reset}>
                                                    Reset
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row className='v-footer'>
                                        <Col className='v-link'>
                                            <NavLink as="a" href="/login">Already have an account?</NavLink>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className='warning-box' >
                                            <Alert show={state.message !== ''} variant='danger'>
                                                {state.message}
                                            </Alert>
                                        </div>
                                    </Row>
                                </Container>
                            </div>
                        </LayoutPage>
                    }
                }
            </UserContext.Consumer>
        )
    }
    return ui();
}

export const ProfileManager = (props: any) => {
    //console.log(securityManager.getUserContext().user);
    let user = securityManager.getUserContext().user;
    securityApp.getTitle = () => {
        return securityManager.getProfileName();
    }
    return (
        <LayoutPage microApp={securityApp} >
             <div className="v-body-main">
            <EntityDetails entity={user} title="" />
            </div>
        </LayoutPage>
    )
}

export const securityApp: SecurityApp = new SecurityApp();