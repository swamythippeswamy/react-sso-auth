/**
 * Created by swamy on 24/3/17.
 */
import React from "react";
import {Form, FormGroup, FormControl, Row, Col, ControlLabel, Button, Alert} from "react-bootstrap";
import FacebookLogin from 'react-facebook-login';
import helpers from './util/helper';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            alertText: ""
        }
    }

    emailLogin() {
        console.log("Login click");

        var emailId = document.getElementById("formHorizontalEmail").value;
        var password = document.getElementById("formHorizontalPassword").value;
        let data = {};
        data["email"] = emailId;
        data["password"] = password;
        data["accountType"] = "EMAIL";
        console.log(JSON.stringify(data));
        this.login(data);
    }

    login(data) {
        helpers.login(data).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                if (response.data.code != 200) {
                    console.log(response.data.data);
                    this.showAlert(response.data.data);
                } else {
                    console.log("Login successful");
                    var authHeader = response.headers["authentication"];
                    this.props.onSuccessLogin(authHeader);
                }

            } else {
                console.log(response.data.data);
                this.showAlert(response.data.data);
            }
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    }

    showAlert(message) {
        this.setState({
            showAlert: true,
            alertText: message
        });
    }

    closeAlert() {
        this.setState({
            showAlert: false
        });
    }

    responseFacebook(response) {
        console.log(response);
        if(response == null) {
            alert("login failed");
            return;
        } else if(response["accessToken"] == null || response["accessToken"] == undefined) {
            alert("Empty access token recieved");
            return;
        }
        let data = {};
        data["email"] = response["email"];
        data["accountType"] = "FACEBOOK";
        data["token"] = response["accessToken"];
        console.log(JSON.stringify(data));
        this.login(data);
    }

    render() {
        return (
            <Row>
                <Col lg={8} lgOffset={2} md={8} mdOffset={2} sm={8} smOffset={2} xs={8} xsOffset={2}>
                    <Form horizontal>

                        <FormGroup>
                            <Col smOffset={3} sm={6}>
                                {this.state.showAlert && <Alert bsStyle="danger" onDismiss={this.closeAlert.bind(this)}>
                                    <p>{this.state.alertText}</p>
                                </Alert>}
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2} smOffset={1}>
                                Email
                            </Col>
                            <Col sm={6}>
                                <FormControl type="email" placeholder="Email Id"/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2} smOffset={1}>
                                Password
                            </Col>
                            <Col sm={6}>
                                <FormControl type="password" placeholder="Min 4 Characters"/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={3} sm={10}>
                                <Button className="btn-primary" onClick={this.emailLogin.bind(this)}>
                                    Submit
                                </Button>
                            </Col>
                        </FormGroup>

                        <legend className="text-muted text-center">or</legend>


                        <Col smOffset={3} sm={4}>
                            <FacebookLogin
                                appId="388722371498856"
                                    autoLoad={false}
                                fields="name,email"
                                callback={this.responseFacebook.bind(this)}
                                cssClass="btn-social btn-lg btn-facebook"
                                icon="fa-facebook"
                                version="v2.8"
                            />
                        </Col>

                    </Form>
                </Col>
            </Row>
        );
    }
}

React.propTypes = {
    onSuccessLogin: React.PropTypes.func.isRequired
};

export default Login;