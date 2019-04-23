import React from 'react'
import './Register.css'
import UserService from "../services/UserService";
//import {Link} from "react-router-dom";
//import {Redirect} from "react-router";


export default class Register extends React.Component {


    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.state = {
            userNameField: '',
            passwordField: '',
            verifyPasswordField: '',
            firstName: '',
            lastName: '',
            backgroundColPassField: "white",
            backgroundColPassVerifyField: "white",
            role: 'INVESTOR',
            backHome: false
        };
    }


    setUserName(userName) {
        this.setState({userNameField: userName});
    }

    setPassField(pass) {
        if (pass !== this.state.verifyPasswordField) {
            this.setState({backgroundColPassField: "#ff2800"});
            this.setState({backgroundColPassVerifyField: "#ff2800"});
        } else {
            this.setState({backgroundColPassField: "green"});
            this.setState({backgroundColPassVerifyField: "green"});
        }
        if (pass.length === 0 && this.state.verifyPasswordField.length === 0) {
            this.setState({backgroundColPassField: "white"});
            this.setState({backgroundColPassVerifyField: "white"});
        }
        this.setState({passwordField: pass});
    }

    setVerifyField(verifyPass) {
        if (verifyPass !== this.state.passwordField) {
            this.setState({backgroundColPassField: "#ff2800"});
            this.setState({backgroundColPassVerifyField: "#ff2800"});
        } else {
            this.setState({backgroundColPassField: "green"});
            this.setState({backgroundColPassVerifyField: "green"});
        }
        if (this.state.passwordField.length === 0 && verifyPass.length === 0) {
            this.setState({backgroundColPassField: "white"});
            this.setState({backgroundColPassVerifyField: "white"});

        }
        this.setState({verifyPasswordField: verifyPass})
    }

    setFirstNameField(name) {
        this.setState({firstName: name});
    }

    setLastNameField(name) {
        this.setState({lastName: name});
    }

    setRoleField(role) {
        this.setState({role: role});
    }

    handleRegister() {
        if (this.state.passwordField !== this.state.verifyPasswordField) {
            alert("Password mismatch!");
            return;
        }

        if (this.state.passwordField.length === 0) {
            alert("Password can't be blank");
            return;
        }

        if (this.state.userNameField.length === 0) {
            alert("User Name can't be blank!");
            return;
        }

        if (this.state.firstName.length === 0) {
            alert("First Name can't be blank!");
            return;
        }

        if (this.state.lastName.length === 0) {
            alert("Last Name can't be blank!");
            return;
        }

        let makeJSON = {
            username: this.state.userNameField,
            password: this.state.passwordField,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            role: this.state.role,
            dob: null,
            email: null,
            phone: null
        };

        this.userService.register(makeJSON).then((target) => {
            this.checkLogin(target)
        });
    }

    checkLogin(target) {
        target.json().then(() => this.setState({backHome: true})).catch(() =>
            alert("User with that user-name already exists!")
        );
    }

    render() {
        if (this.state.backHome === true) {
           // return <Redirect to='/'/>
        }
        return (
            <div id={"registerContainer"}>
            <div id="mainContainer" className="container">
                <div className="col-sm-10">
                    <h1 id={"registerText"}>Register</h1>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-5 col-form-label"
                               id={"usernameLabel"}>Username </label>
                        <div className="col-sm-7">
                            <input className="form-control" id="username"
                                   placeholder="Username" onChange={(event) => this.setUserName(event.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-5 col-form-label"
                               id={"usernameLabel"}>Password</label>

                        <div className="col-sm-7">
                            <input className="form-control" id="password"
                                   type={"password"}
                                   style={{backgroundColor: this.state.backgroundColPassField}}
                                   placeholder="123qwe#$%" onChange={(event) => this.setPassField(event.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="verify-password" className="col-sm-5 col-form-label" id={"usernameLabel"}>Verify
                            Password</label>
                        <div className="col-sm-7">
                            <input className="form-control" id="password"
                                   placeholder="Enter Your Password Again"
                                   type={"password"}
                                   style={{backgroundColor: this.state.backgroundColPassVerifyField}}
                                   onChange={(event) => this.setVerifyField(event.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-5 col-form-label" id={"usernameLabel"}>First
                            Name</label>
                        <div className="col-sm-7">
                            <input className="form-control" id="password"
                                   placeholder="123qwe#$%"
                                   onChange={(event) => this.setFirstNameField(event.target.value)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-5 col-form-label" id={"usernameLabel"}>Last
                            Name</label>
                        <div className="col-sm-7">
                            <input className="form-control" id="password"
                                   placeholder="123qwe#$%"
                                   onChange={(event) => this.setLastNameField(event.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">

                        <label htmlFor="widgetSelectHeading" className="col-sm-5 col-form-label"
                               id={"usernameLabel"}>Role</label>

                        <div className="col-sm-7">
                            <select className="custom-select"
                                    id="widgetSelectHeading"
                                    value={this.state.role}
                                    onChange={(event) => this.setRoleField(event.target.value)}>
                                <option value={"INVESTOR"}>Investor</option>
                                <option value={"BROKER"}>Broker</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className={"col-sm-5"}/>
                        <div className="col-sm-7 float-right">
                            <button type={"button"} className="btn btn-success btn-block"
                                    onClick={() => this.handleRegister()}>Sign Up
                            </button>
                            <div className="row">
                                <div className="col-6">
                                    <a href={""} id={"registerLink"}>
                                        Sign In
                                    </a>
                                </div>
                                <div className="col-6">
                                    <a href={""} className={"float-right"} id={"registerLink"}>
                                        Back Home
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        )
    }
};
