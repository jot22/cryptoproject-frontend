import React from 'react'
import './Profile.css'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            phoneFld: '',
            emailFld: '',
            roleFld: '',
            dobFld: '',
            firstName: '',
            lastName: '',
            wholeUser: [],
            renderSuc: false
        }
    }

    // submitProfileChange() {
    //     let formatJSON = {
    //         id: 5
    //         , username: "a"
    //         , firstName: this.state.firstName
    //         , lastName: this.state.lastName
    //         , password: "f"
    //         , role: this.state.roleFld
    //         , email: this.state.emailFld
    //         , dob: this.state.dobFld
    //         , phone: this.state.phoneFld
    //     };
    //     this.state.service.updateUser(formatJSON).then(
    //         (resp) => resp.json()).then(
    //         (e) => {
    //             this.setState({
    //                 user: e,
    //                 renderSuc: true,
    //                 firstName: '',
    //                 lastName: '',
    //                 phoneFld: '',
    //                 emailFld: ''
    //
    //             })
    //         }
    //     )
    // };

    // setFirstName(name) {
    //     this.setState({firstName: name})
    // };
    //
    // setLastName(name) {
    //     this.setState({lastName: name});
    // }
    //
    // setPhone(phone) {
    //     this.setState({phoneFld: phone});
    // }
    //
    // setEmail(email) {
    //     this.setState({emailFld: email});
    // }
    //
    // setRole(role) {
    //     this.setState({roleFld: role});
    // }
    //
    // setDob(dob) {
    //     this.setState({dobFld: dob});
    // }


    // componentWillMount() {
    //     let userService = new UserService();
    //     userService.profile().then((target) => {
    //         this.checkLogin(target)
    //     }).catch(() => console.log("FF"));
    // }


    // renderSuccess() {
    //     let buffer = [];
    //     if (this.state.renderSuc) {
    //         buffer.push(
    //             <div className="alert alert-success" role="alert">
    //                 Profile successfully saved
    //             </div>
    //         )
    //     }
    //     return buffer;
    //
    // }

    render() {
        return (
            <div id={"bigProfileContain"}>
                <div id="mainContainer" className="container">
                    <h1 id={"registerText"}>{/*this.state.user.username*/}Hello, Alice</h1>
                    <form>


                        <div className="form-group row">
                            <label form="firstName"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>First Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       value={"John"} readOnly={true}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="lastName"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Last Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       value={"Smith"} readOnly={true}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="telephone"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Phone</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"

                                       value={"555-555-5555"} readOnly={true}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="email"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Email</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="email"
                                       placeholder={this.state.user.email}
                                       value={"this.state.emailFld"} readOnly={true}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="email"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Managed By</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="email"
                                       placeholder={this.state.user.email}
                                       value={"Sir Scamalot"} readOnly={true}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="dob"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>DOB</label>
                            <div className="col-sm-7">
                                <input type="date"
                                       className="form-control" id="dob"
                                       defaultValue={this.state.user.dob}
                                    //value={this.state.user.dob}
                                       readOnly={true}/>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label" id={"usernameLabel"}/>
                            <div className="col-sm-7">
                                <a href={""} style={{textDecoration: 'none'}}>
                                    <button type={"button"} className={"btn btn-warning btn-block"}>
                                        Back Home
                                    </button>
                                </a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
};
