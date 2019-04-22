import React from 'react';
import '../home/HomePage.css';
import CryptoService from "../services/CryptoService";
import UserService from "../services/UserService";

export default class ApiContent extends React.Component {
    constructor(props) {
        super(props);
        this.cryptoService = CryptoService.getInstance();
        this.userService = UserService.getInstance();
        this.state = {
            crypto: [],
            user: {}
        }
    }

    componentDidMount() {
        let newNewUser = {
            username: "Yo",
            password: "Buck"
        };
        this.userService.login(newNewUser).then(registered => {
            console.log("REGISTERED");
            console.log(registered);
        });
    }

    profile() {
        this.userService.profile().then(regi => {
            console.log("PROFILE");
            console.log(regi);
        })
    }

    render() {
        return(
            <div className={"White"}>
                Hello World!
                <button type="button" className="btn btn-success " id={"profile"}
                        onClick={() => this.profile()}>Profile
                </button>
            </div>
        )
    }
}

