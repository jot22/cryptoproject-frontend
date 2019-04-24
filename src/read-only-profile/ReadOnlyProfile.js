import React from 'react'
import './ReadOnlyProfile.css'
import {Link} from "react-router-dom";
import UserService from "../services/UserService";

export default class ReadOnlyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();

        this.profileId = props.match.params.id;
        this.state = {
            user: {},
            userFound: [],
            foundU: false
        }
    }

    componentDidMount() {
        console.log(this.profileId);
        let found = false;
        this.userService.findAllUsers().then(m => {
            m.map(eachUser => {
                if (eachUser.username === this.profileId) {
                    found = true;
                    this.setState({userFound: eachUser},
                        () => this.setState({foundU: found}))
                }
            });

        });


    }

    render() {
        if (!this.state.foundU) {
            return (
                <div id={"bigProfileContain"}>
                    <div id="mainContainer" className="container">
                        <h1 id={"registerText"}>User not Found</h1>
                    </div>
                </div>
            )

        }
        return (
            <div id={"bigProfileContain"}>
                <div id="mainContainer" className="container">
                    <h1 id={"registerText"}>Profile, {this.state.userFound.username}</h1>
                    <form>
                        <div className="form-group row">
                            <label form="firstName"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>First Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       defaultValue={this.state.userFound.firstName}
                                       placeholder={"Dunkin"} readOnly={true}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="lastName"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Last Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       defaultValue={this.state.userFound.lastName}
                                       placeholder={"Donuts"} readOnly={true}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label" id={"usernameLabel"}/>
                            <div className="col-sm-7">
                                <a style={{textDecoration: 'none'}}>
                                    <button type={"button"}
                                            className={"btn btn-success btn-block"}>
                                        Following
                                    </button>
                                </a>
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
}
