/**
 * Created by swamy on 24/3/17.
 */

import React from 'react';
import {Navbar, Button, Col} from 'react-bootstrap';

class Header extends React.Component {


    constructor(props) {
        super(props);
    }

    signInClick() {
        console.log("Sign In Button click");
        this.props.changeView(false, true, false);
    }

    signOutClick() {
        console.log("Sign Out Button click");
        this.props.onSignOut();
    }

    registerButtonClick() {
        console.log("Register Button click");
        this.props.changeView(false, false, true);
    }

    resetHome() {
        this.props.changeView(true, false, false);
    }

    render() {
        console.log("Auth header : ", this.props.authHeader);
        return (

            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="javascript:void(0)" onClick={this.resetHome.bind(this)}>SSO JWT</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>


                {!this.props.authHeader &&
                <Navbar.Collapse>
                    <Navbar.Form pullRight>
                        <Col sm={2}>
                            <Button onClick={this.signInClick.bind(this)}>Sign in</Button>
                        </Col>

                        <Col sm={4} smOffset={3}>
                            <Button onClick={this.registerButtonClick.bind(this)}>Register</Button>
                        </Col>
                    </Navbar.Form>

                </Navbar.Collapse>}

                {this.props.authHeader &&
                <Navbar.Collapse>
                    <Navbar.Form pullRight>
                        <Col sm={2}>
                            <Button onClick={this.signOutClick.bind(this)}>Sign out</Button>
                        </Col>
                    </Navbar.Form>

                </Navbar.Collapse>}

            </Navbar>


        );
    }
}

React.propTypes = {
    changeView: React.PropTypes.func.isRequired,
    authHeader: React.PropTypes.string.isRequired,
    onSignOut: React.PropTypes.func.isRequired
};

export default Header;