import React from 'react'
import './Login.css'
//import {Link} from "react-router-dom";
//import {Redirect} from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameField: '',
            passwordField: '',
            backHome: false
        };
    }

    userNameFieldSet(event) {
        this.setState({userNameField: event.target.value});
    }

    passwordFieldSet(event) {
        this.setState({passwordField: event.target.value});
    }

    logInProcedure() {
        let makeJSON = {
            username: this.state.userNameField,
            password: this.state.passwordField
        };
        console.log(makeJSON);
    }


    render() {
        if (this.state.backHome === true) {
            //return <Redirect to='/'/>
        }
        return (
            <div id="mainContainer" className="container">
                <div className="col-sm-10">
                    <h1 id="signInHeader">Log In</h1>
                </div>
                <form>
                    <div className="form-group col">
                        <label htmlFor="username" id={"userLabel"}
                               className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input className="form-control" id="username"
                                   placeholder="Alice"
                                   onChange={(event) => this.userNameFieldSet(event)}/>
                        </div>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="password"
                               className="col-sm-2 col-form-label" id={"passwordLabel"}>Password</label>
                        <div className="col-sm-10">
                            <input type="password"
                                   className="form-control wbdv-password-fld"
                                   id="password"
                                   autoComplete={"current-password"}
                                   placeholder="123qwe#$%" onChange={(event) => this.passwordFieldSet(event)}/>
                        </div>
                    </div>
                    <div className="form-group col">
                        <label className="col-sm-2 col-form-label"/>
                        <div className="col-sm-10">
                            <button type="button" className="btn btn-success btn-block" id={"signInButton"}
                                    onClick={() => this.logInProcedure()}>Sign in
                            </button>
                            <div className="row">
                                <div className="col-6">
                                    <a href={""} id={"registerLink"}>New User? Register</a>
                                </div>
                                <div className="col-6">
                                    <a href={""} id={"homeLink"}>Back Home</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};
