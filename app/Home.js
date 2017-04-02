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
            this.props.changeView(false, false, false, true);
        }
    }

    render() {

        return (
            <Row>
                <Row>
                    <h3>Greetings from The Akshaya Patra Foundation!</h3>
                    <div>Through our mid-day meal programme, our attempt is to feed the millions of children in India
                        who
                        have the zeal to learn and achieve, but not the means. By feeding them that one wholesome meal a
                        day, we give them the motivation and nourishment they need to pursue an education and a better
                        future. It is our endeavour to reach out to every child at the grass root level of the society.
                        Please click the below button for Donating
                    </div>
                </Row>

                <br/>
                <Row>
                    <Button className="btn-primary" onClick={this.donateClick.bind(this)}>
                        Donate
                    </Button>
                </Row>
            </Row>
        )
    }
}

React.propTypes = {
    changeView: React.PropTypes.func.isRequired,
    authHeader: React.PropTypes.string.isRequired
};

export default Home;