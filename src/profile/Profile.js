import React from 'react'
import './Profile.css'
import UserService from '../services/UserService';
import {Link} from 'react-router-dom';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.state = {
            user: {},
            brokers: [],
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
        this.userService.findAllUsers().then(users => {
            this.setState({brokers: users.filter(user => user.type === 'BROKER')})
        })
    }

    updateFirstName = (event) => {
        let newUser = this.state.user;
        newUser.firstName = event.target.value;
        this.setState({
            user: newUser
        })
    };

    updateLastName = (event) => {
        let newUser = this.state.user;
        newUser.lastName = event.target.value;
        this.setState({
            user: newUser
        })
    };
    updatePhone = (event) => {
        let newUser = this.state.user;
        newUser.phone = event.target.value;
        this.setState({
            user: newUser
        })
    };
    updateEmail = (event) => {
        let newUser = this.state.user;
        newUser.email = event.target.value;
        this.setState({
            user: newUser
        })
    };
    updateWallet = (event) => {
        let newUser = this.state.user;
        newUser.wallet = event.target.value;
        this.setState({
            user: newUser
        })
    };

    updateBroker = (event) => {
        if(event.target.value !== "Select a Broker") {
            let newUser = this.state.user;
            newUser.broker = event.target.value;
            this.setState(
                {
                    user: newUser
                }
            )
        }
    };

    getProfile = () => {
        this.userService.profile().then(response => {
            console.log(response);
            this.setState({
                user: response,
            })
        })
    };

    updateProfile = () => {
        console.log(this.state.user.broker)
        this.userService.updateUser(this.state.user._id, this.state.user).then(response => {
                console.log(response);
            }
        )
    };
    

    loadInvestorOnly = () => {
        let buffer = [];
        if(this.state.user.type === "INVESTOR"){
            buffer.push(
                <div className="form-group row">
                    <label form="email"
                           className="col-sm-5 col-form-label" id={"usernameLabel"}>Managed By</label>
                    <div className="col-sm-7">
                        <select className="form-control" id="email"
                                value={this.state.user.broker}
                                disabled={(this.state.user.broker != null)}
                                onChange={this.updateBroker}>
                            <option>
                                Select a Broker
                            </option>
                            {
                                this.state.brokers.map(broker => {
                                        return (
                                            <option value={broker._id}>
                                                {broker.firstName} {broker.lastName}
                                            </option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div>
                </div>
            );
            buffer.push(
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
            );
        }
        return buffer;
    };

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
                        {this.loadInvestorOnly()}
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label" id={"usernameLabel"}/>
                            <div className="col-sm-7">
                                <a style={{textDecoration: 'none'}}>
                                    <button type={"button"} onClick={this.updateProfile}
                                            className={"btn btn-success btn-block"}>
                                        Update
                                    </button>
                                </a>
                                <Link to={'/followers/'+this.state.user.username}>
                                    <button type={"button"} className={"btn btn-primary btn-block"}>
                                        Following
                                    </button>
                                </Link>
                                <Link to={'/'}>
                                    <button type={"button"} className={"btn btn-warning btn-block"}>
                                        Back Home
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
};
