/**
 * Created by swamy on 26/3/17.
 */

import React from 'react';

import {Row, Col, Button} from "react-bootstrap";
import helpers from './util/helper';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    donateClick() {
        if (!this.props.authHeader || this.props.authHeader == "") {
            alert("Please login to donate");
        } else {
            helpers.getUserInfo(this.props.authHeader).then(function (response) {
                if (response && response.status == 200 && response.data) {
                    console.log(response.data);
                    console.log(response.data.data);
                    var userInfo = {};
                    userInfo["name"] = response.data.data["userName"];
                    userInfo["email"] = response.data.data["emailId"];
                    this.props.showUserInfo(userInfo);
                } else {
                    alert("Error in getting userdata")
                }
            }.bind(this))
        }
    }

    render() {

        return (
            <div>
                <Row>
                    <h3>Greetings from The Akshaya Patra Foundation!</h3>
                    <div>Through our mid-day meal programme, our attempt is to feed the millions of children in India
                        who
                        have the zeal to learn and achieve, but not the means. By feeding them that one wholesome meal a
                        day, we give them the motivation and nourishment they need to pursue an education and a better
                        future. It is our endeavour to reach out to every child at the grass root level of the society.
                    </div>
                </Row>

                <Row>
                    <Button className="btn-primary" onClick={this.donateClick.bind(this)}>
                        Donate
                    </Button>
                </Row>

                {this.props.userInfo && this.props.userInfo.name && this.props.userInfo.name != "" && <Row>
                    <Col>
                        <span>Name:</span>
                        <span>{this.props.userInfo.name}</span>

                    </Col>
                </Row>}
                {this.props.userInfo && this.props.userInfo.email && this.props.userInfo.email != "" && <Row>
                    <Col>
                        <span>Email:</span>
                        <span>{this.props.userInfo.email}</span>
                    </Col>
                </Row>}
            </div>
        )
    }
}

React.propTypes = {
    authHeader: React.PropTypes.string.isRequired,
    showUserInfo: React.PropTypes.func.isRequired,
    userInfo: React.PropTypes.object.isRequired,
};

export default Home;