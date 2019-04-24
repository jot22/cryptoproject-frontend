import React from 'react'
import './ReadOnlyProfile.css'
import {Link} from "react-router-dom";

export default class ReadOnlyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.profileId = props.match.params.id;
        this.state = {
            user: {}
        };

    }

    componentDidMount() {

    }

    render() {
        return (
            <div id={"bigProfileContain"}>
                <div id="mainContainer" className="container">
                    <h1 id={"registerText"}>{/*this.state.user.username*/}Profile, Tom</h1>
                    <form>
                        <div className="form-group row">
                            <label form="firstName"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>First Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       defaultValue={this.state.user.firstName}
                                       placeholder={"Dunkin"} readOnly={true}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label form="lastName"
                                   className="col-sm-5 col-form-label" id={"usernameLabel"}>Last Name</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="telephone"
                                       defaultValue={this.state.user.lastName}
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
