import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, NavLink } from "react-bootstrap";
import { Route, useNavigate, useSearchParams } from "react-router-dom";
import { MicroApp, RouteItem } from "../../common/micro-app";


import { LayoutPage } from "../../common/layout";
import { securityManager, UserContextType, UserContext, LoginObject } from "../../common/security/security-manager";
import './security-app.css';
import { homeApp } from "../home/home-app";

class SecurityApp implements MicroApp {

    private routeItems: Array<RouteItem> = [
        this.newItem('users', "Users", 'Security'),
        this.newItem('roles', "Roles", 'Security'),
        this.newItem('permissions', "Permissions", 'Security')
    ];

    private newItem(name: string, label: string, group: string) {
        let routeItem = new RouteItem().init(name, label, group);
        routeItem.route = () => {
            return <UsersManager routeItem={routeItem} />
        };
        return routeItem;
    }

    public getName = () => {
        return "security-app";
    }
    public getTitle = (): string => {
        return "Security";
    }

    public getNavItems = () => {
        return this.routeItems;
    }

    public getRouteItems = () => {
        return [];
    }

    public routes = () => {
        return this.routeItems.map((r, idx) => {
            return <Route key={`route_` + idx} path={`/${r.name}`} element={r.route()} />
        });
    }


    public getRoutes = () => {
        return (
            <>
                <Route path={`/login`} element={<LoginForm />} />
                <Route path={`/signup`} element={<SignupForm />} />
            </>
        )
    }
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
                            <div className="security-app">
                                <Container className='login'>
                                    <Row className='panel-header' >
                                        <Col className='panel-header-title'>
                                            Sign In
                                        </Col>
                                    </Row>
                                    <Row className='panel-body'>
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
                                            <Form.Group className="form-buttons" >
                                                <Button variant="primary" type="submit">
                                                    Sign in
                                                </Button>{' '}
                                                <Button variant="secondary" onClick={reset}>
                                                    Reset
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row className='panel-body'>
                                        <Col className='panel-link'>
                                            <NavLink as="a" href="/signup">Don't have account yet?</NavLink>
                                        </Col>
                                    </Row>
                                    <Row className='panel-footer'>
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
                            <div className="security-app">
                                <Container className='login'>
                                    <Row className='panel-header'>
                                        <Col className='panel-header-title'>
                                            Sign Up
                                        </Col>
                                    </Row>
                                    <Row className='panel-body'>
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

                                            <Form.Group className="form-buttons" >
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>{' '}
                                                <Button variant="secondary" onClick={reset}>
                                                    Reset
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row className='panel-body'>
                                        <Col className='panel-link'>
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

export const UsersManager = (props: any) => {
    const routeItem = props.routeItem;
    let name = routeItem.name;
    return (
        <LayoutPage microApp={securityApp} routeItem={routeItem}>
            <h1>
                Welcome to the user manager {name}
            </h1>
        </LayoutPage>
    )
}

export const securityApp: SecurityApp = new SecurityApp();