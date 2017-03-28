/**
 * Created by swamy on 24/3/17.
 */
import React from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            home: true,
            signIn: false,
            register: false,
            jwtHeader: "",
            userInfo: {}
        }
    }

    componentDidMount() {
        this.state = {
            home: true,
            signIn: false,
            register: false
        }
    }


    changeState(home, signIn, register) {
        this.setState({
            home: home,
            signIn: signIn,
            register: register
        });
    }

    onSuccessLogin(jwtHeader) {
        console.log(jwtHeader);
        this.setState({
            home: true,
            signIn: false,
            register: false,
            jwtHeader: jwtHeader,
            userInfo: {}
        });
    }

    showUserInfo(userInfo) {
        console.log(userInfo);
        this.setState({
            userInfo: userInfo
        });
    }

    signOut() {
        this.setState({
            home: true,
            signIn: false,
            register: false,
            jwtHeader: "",
            userInfo: {}
        });
    }

    render() {
        return (
            <div className="container">
                <Header changeView={this.changeState.bind(this)} authHeader={this.state.jwtHeader}
                        onSignOut={this.signOut.bind(this)}/>
                {this.state.home && <Home authHeader={this.state.jwtHeader} showUserInfo={this.showUserInfo.bind(this)}
                                          userInfo={this.state.userInfo}/>}
                {this.state.signIn && <Login onSuccessLogin={this.onSuccessLogin.bind(this)}/>}
                {this.state.register && <Register onSuccessLogin={this.onSuccessLogin.bind(this)}/>}
            </div>
        );
    }
}

export default  Main;