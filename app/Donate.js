/**
 * Created by swamy on 2/4/17.
 */

import React from 'react';
import {Row, Col, Jumbotron, Button} from 'react-bootstrap';
import helpers from './util/helper';

class Donate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        helpers.getUserInfo(this.props.authHeader).then(function (response) {
            if (response && response.status == 200 && response.data) {
                console.log(response.data);
                console.log(response.data.data);
                var userData = {};
                userData["name"] = response.data.data["userName"];
                userData["email"] = response.data.data["emailId"];
                this.setState({
                    userInfo: userData
                })
            } else {
                alert("Error in getting userdata")
            }
        }.bind(this))
    }

    componentWillReceiveProps() {
        helpers.getUserInfo(this.props.authHeader).then(function (response) {
            if (response && response.status == 200 && response.data) {
                console.log(response.data);
                console.log(response.data.data);
                var userData = {};
                userData["name"] = response.data.data["userName"];
                userData["email"] = response.data.data["emailId"];
                this.setState({
                    userInfo: userData
                })
            } else {
                alert("Error in getting userdata")
            }
        }.bind(this))
    }

    render() {
        console.log(this.state.userInfo);
        return (

            <Row>

                <Jumbotron>

                    {this.state.userInfo && this.state.userInfo.name && this.state.userInfo.name != "" && <Row>
                        <Col>
                            <h2>Hello, {this.state.userInfo.name}</h2>
                        </Col>
                    </Row>}
                    {this.state.userInfo && this.state.userInfo.email && this.state.userInfo.email != "" && <Row>
                        <Col>
                            <p>Reciept will be sent to your emailId : {this.state.userInfo.email}</p>
                            <p><Button bsStyle="primary">Change emailId</Button></p>
                        </Col>
                    </Row>}

                </Jumbotron>


            </Row>
        );
    }
}

React.propTypes = {
    authHeader: React.PropTypes.string.isRequired,
};

export default Donate;