/**
 * Created by swamy on 25/3/17.
 */
import React from "react";
import {Form, FormGroup, FormControl, Row, Col, ControlLabel, Button, Alert} from "react-bootstrap";

import helpers from './util/helper';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            alertText: "",
            alertStatus: "danger"
        }
    }

    showAlert(message, status) {
        this.setState({
            showAlert: true,
            alertText: message,
            alertStatus: status
        });
    }

    closeAlert() {
        this.setState({
            showAlert: false
        });
    }

    signUp() {
        var name = document.getElementById("formHorizontalName").value;
        var emailId = document.getElementById("formHorizontalEmail").value;
        var password = document.getElementById("formHorizontalPassword").value;
        let data = {};
        data["email"] = emailId;
        data["password"] = password;
        data["name"] = name;

        helpers.signup(data).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                if (response.data.code != 200) {
                    console.log(response.data.data);
                    this.showAlert(response.data.data, "danger");
                } else {
                    console.log("Login successf ul");
                    var authHeader = response.headers["authentication"];
                    this.showAlert(response.data.data, "success");
                    // this.props.onSuccessLogin(authHeader);
                }

            } else {
                console.log(response.data.data);
                this.showAlert(response.data.data, "danger");
            }
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <Row>
                <Col lg={8} lgOffset={2} md={8} mdOffset={2} sm={8} smOffset={2} xs={8} xsOffset={2}>
                    <Form horizontal>

                        <FormGroup>
                            <Col smOffset={3} sm={6}>
                                {this.state.showAlert && <Alert bsStyle={this.state.alertStatus} onDismiss={this.closeAlert.bind(this)}>
                                    <p>{this.state.alertText}</p>
                                </Alert>}
                            </Col>
                        </FormGroup>

                        {!(this.state.alertStatus == "success") && <div>
                            <FormGroup controlId="formHorizontalName">
                                <Col componentClass={ControlLabel} sm={2} smOffset={1}>
                                    Name
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="Name"/>
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
                                    <Button className="btn-primary" onClick={this.signUp.bind(this)}>
                                        Submit
                                    </Button>
                                </Col>
                            </FormGroup>
                        </div>
                        }

                    </Form>
                </Col>
            </Row>
        );
    }
}


React.propTypes = {
    onSuccessLogin: React.PropTypes.func.isRequired
}

export default Register;