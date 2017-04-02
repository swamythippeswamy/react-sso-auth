/**
 * Created by swamy on 24/3/17.
 */
import React from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Donate from "./Donate";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            home: true,
            signIn: false,
            register: false,
            donate: false,
            jwtHeader: ""
        }
    }

    componentDidMount() {
        this.state = {
            home: true,
            signIn: false,
            register: false
        }
    }


    changeState(home, signIn, register, donate) {
        this.setState({
            home: home,
            signIn: signIn,
            register: register,
            donate: donate
        });
    }

    onSuccessLogin(jwtHeader) {
        console.log(jwtHeader);
        this.setState({
            home: true,
            signIn: false,
            register: false,
            jwtHeader: jwtHeader,
            donate: false
        });
    }

    signOut() {
        this.setState({
            home: true,
            signIn: false,
            register: false,
            jwtHeader: "",
            donate: false,
        });
    }

    render() {
        return (
            <div className="container">
                <Header changeView={this.changeState.bind(this)} authHeader={this.state.jwtHeader}
                        onSignOut={this.signOut.bind(this)}/>
                {this.state.home && <Home authHeader={this.state.jwtHeader} changeView={this.changeState.bind(this)}/>}
                {this.state.signIn && <Login onSuccessLogin={this.onSuccessLogin.bind(this)}/>}
                {this.state.register && <Register onSuccessLogin={this.onSuccessLogin.bind(this)}/>}
                {this.state.donate && <Donate authHeader={this.state.jwtHeader}/>}
            </div>
        );
    }
}

export default  Main;