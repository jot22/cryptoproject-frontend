import React from 'react'
import './Profile.css'
import UserService from '../services/UserService';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.state = {
            user: {},
            phoneFld: '',
            emailFld: '',
            roleFld: '',
            dobFld: '',
            firstName: '',
            lastName: '',
            wholeUser: [],
            wallet: 0,
            renderSuc: false
        }
    }
    componentDidMount() {
        this.getProfile();
        console.log(this.state.user);
    }
    updateFirstName = (event) => {
        let newUser = this.state.user;
        newUser.firstName = event.target.value;
        this.setState({
            user: newUser
        })
    }

    updateLastName = (event) => {
        let newUser = this.state.user;
        newUser.lastName = event.target.value;
        this.setState({
            lastName: newUser
        })
    }
    updatePhone = (event) => {
        let newUser = this.state.user;
        newUser.phone = event.target.value;
        this.setState({
            phoneFld: newUser
        })
    }
    updateEmail = (event) => {
        let newUser = this.state.user;
        newUser.email = event.target.value;
        this.setState({
            emailFld: newUser
        })
    }
    updateWallet = (event) => {
        let newUser = this.state.user;
        newUser.wallet = event.target.value;
        this.setState({
            wallet: newUser
        })
    }

    getProfile = () => {
        this.userService.profile().then(response => {
            console.log(response);
            this.setState({
                user: response,
            })
        })
    }

    updateProfile = () => {
        console.log(this.state.firstName);
        this.userService.updateUser(this.state.user._id, this.state.user).then(response => {
            console.log(response);
            }
        )
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
                    <h1 id={"registerText"}>{/*this.state.user.username*/}Hello, {this.state.user.username}</h1>
                    <form>



                        <div className="form-group row">
                            <label form="firstName"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>First Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       onChange={this.updateFirstName}
                                       defaultValue={this.state.user.firstName}
                                       placeholder={"Dunkin"} readOnly={false}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="lastName"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Last Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       onChange={this.updateLastName}
                                       defaultValue={this.state.user.lastName}
                                       placeholder={"Donuts"} readOnly={false}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="telephone"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Phone</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       onChange={this.updatePhone}
                                       defaultValue={this.state.user.phone}
                                       placeholder={"555-555-5555"} readOnly={false}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="email"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Email</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="email"
                                       onChange={this.updateEmail}
                                       defaultValue={this.state.user.email}
                                       placeholder={"google@gmail.com"}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="email"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Managed By</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="email"
                                       placeholder={this.state.user.broker}
                                       defaultValue={"Sir Scamalot"} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="dob"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Wallet</label>
                            <div className="col-sm-7">
                                <input type="email"
                                       className="form-control" id="dob"
                                       onChange={this.updateWallet}
                                       placeholder={9001}
                                       defaultValue={this.state.user.wallet}/>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label" id={"usernameLabel"}/>
                            <div className="col-sm-7">
                                <a  style={{textDecoration: 'none'}}>
                                    <button type={"button"} onClick={this.updateProfile} className={"btn btn-success btn-block"}>
                                        Update
                                    </button>
                                </a>
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
