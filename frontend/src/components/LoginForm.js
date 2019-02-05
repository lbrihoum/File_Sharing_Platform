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

        // Import md5 lib.
        this.md5 = require('md5');

        this.state = {
            email: '',
            password: ''
        }

        this.app = props.app;
        this.performLogin = this.performLogin.bind(this);
    }

    performLogin(event) {
        window.socket.emit('request_authenticate',
        { email: this.state.email, passwordHash: this.md5(this.state.password) },
        (authStatus) => {
          if (authStatus) {
            console.log('Authenticated!');
            
            // Set authentication state.
            this.app.setState({authenticated: true });
          }
          else {
              alert('Authorization failed!');
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
                                        <Input 
                                            type="email" 
                                            name="email" 
                                            id="loginEmail" 
                                            placeholder="user@whiting-turner.com"
                                            value={this.state.email}
                                            onChange={e => this.setState({ email: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="loginPassword">Password</Label>
                                        <Input 
                                            type="password" 
                                            name="password" 
                                            id="loginPassword" 
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={e => this.setState({ password: e.target.value })}
                                        />
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