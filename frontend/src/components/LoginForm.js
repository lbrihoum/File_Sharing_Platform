import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Img
} from 'reactstrap';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.performLogin = this.performLogin.bind(this);
        this.app = props.app;
    }

    performLogin(event) {
        window.socket.emit('request_authenticate',
        { username: 'username', password: 'password' },
        (authStatus) => {
          if (authStatus) {
            console.log('Authenticated!');
            
            // Set authentication state.
            this.app.setState({authenticated: true });
          }
        });

        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <img src="http://www.whiting-turner.com/images/WT-Orange.png" className="img-logo img-fluid d-block mx-auto" alt="Whiting Turner"/>
                <Row>
                    <Col lg={{ size: 6, offset: 3 }} md={{ size: 10, offset: 1}}>
                        <Card>
                            <CardHeader>Login</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.performLogin}>
                                    <FormGroup>
                                        <Label for="loginEmail">Email</Label>
                                        <Input type="email" name="email" id="loginEmail" placeholder="user@whiting-turner.com" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="loginPassword">Password</Label>
                                        <Input type="password" name="password" id="loginPassword" placeholder="Password"/>
                                    </FormGroup>
                                    <Button color="success" size="lg" block>Login</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}